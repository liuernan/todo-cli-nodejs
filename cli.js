#!/usr/bin/env node

const {program} = require('commander');
const apis = require('./index.js');

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
  .command('show', { isDefault: true })
  .description('show all todos')
  .action(() => {
    apis.show().then(() => {
    }, () => {
    });
  });

program.parse(process.argv);