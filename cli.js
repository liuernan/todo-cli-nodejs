#!/usr/bin/env node

const {program} = require('commander');
const apis = require('./index.js');
const inquirer = require('inquirer');

program
  .command('add <todoTitle> [done]')
  .description('add a new todo as undo, mark its status as done with another param [done]')
  .action((todoTitle, status) => {
    apis.add(todoTitle, status).then(() => {
      console.log('successfully add a new todo!');
    }, () => {
      console.log('failed to add a new todo!');
    });
  });

program
  .command('clear')
  .description('clear all todos')
  .action(() => {
    apis.clear().then(() => {
      console.log('successfully cleared all todos!');
    }, () => {
      console.log('failed to clear all todos!');
    });
  });

program
  .command('show', {isDefault: true})
  .description('show all todos')
  .action(() => {
    apis.show().then((todoList) => {
      if (0 === todoList.length) {
        console.log('no todos yet, try "todo add" to add some.');
        return
      }
      showAllItem(todoList);
    }, () => {
      console.log('something is wrong, trying "todo clear" and "todo add" to rewrite.');
    });
  });

program.parse(process.argv);

showAllItem = (todoList) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'select to mark as done/undo, or change title, or delete',
        choices: [
          {
            name: 'quit',
            value: '-1'
          },
          {
            name: 'add a new todo',
            value: '-2'
          },
          ...todoList.map((item, index) => {
            return {
              name: `[ ${'done' === item.status ? '✅' : '  '} ] ${index + 1} : ${item.title}`,
              value: index.toString()
            }
          })
        ]
      }
    ])
    .then((answer) => {
      switch (answer.index) {
        case '-1':
          break;
        case '-2':
          addItem();
          break;
        default:
          updateItem(todoList, answer.index);
          break;
      }
    });
};

addItem = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What's going to do ?"
    }
  ]).then((answers) => {
    apis.add(answers.title, 'undo').then(() => {
      console.log('successfully add a new todo!');
    }, () => {
      console.log('failed to add a new todo!');
    });
  });
};

updateItem = (todoList, index) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'update this todo item:',
        choices: [
          {
            name: 'quit',
            value: 'quit'
          }, {
            name: 'mark as done',
            value: 'markAsDone'
          }, {
            name: 'mark as undo',
            value: 'markAsUndo'
          }, {
            name: 'change title',
            value: 'updateTitle'
          }, {
            name: 'delete',
            value: 'deleteItem'
          }
        ]
      }
    ])
    .then((answer) => {
      const actionsMap = {quit, markAsDone, markAsUndo, updateTitle, deleteItem};
      actionsMap[answer.action] && actionsMap[answer.action](todoList, index)
    });
};

quit = () => {
};

markAsDone = (todoList, index) => {
  const newTodoList = [...todoList];
  newTodoList[index].status = 'done';
  overWrite(newTodoList)
};

markAsUndo = (todoList, index) => {
  const newTodoList = [...todoList];
  newTodoList[index].status = 'undo';
  overWrite(newTodoList)
};

updateTitle = (todoList, index) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "change this todo title as ?"
    }
  ]).then((answers) => {
    const newTodoList = [...todoList];
    newTodoList[index].title = answers.title;
    overWrite(newTodoList);
  });
};

deleteItem = (todoList, index) => {
  const newTodoList = [...todoList];
  newTodoList.splice(index, 1);
  overWrite(newTodoList)
};

overWrite = (newTodoList) => {
  apis.overWrite(newTodoList).then(() => {
    console.log('todoList update success.');
  }, () => {
    console.log('todoList update failed.');
  });
};