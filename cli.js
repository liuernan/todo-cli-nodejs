const {program} = require('commander');
const apis = require('./index.js');

program
  .command('add <todoTitle> [status]')
  .description('add a new todo as undo, mark its status as done with another param [done]')
  .action((todoTitle, status) => {
    apis.add(todoTitle, status);

  });

program
  .command('clear')
  .description('clear all todos')
  .action(() => {
    apis.clear();
  });

program
  .command('show')
  .description('show all todos')
  .action(() => {
    apis.show();
  });

program.parse(process.argv);