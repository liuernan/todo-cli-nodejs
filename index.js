const { program } = require('commander');

program
  .command('add <todoTitle>')
  .description('add a new todo')
  .action((source, destination) => {
    console.log('add command called');
  });

program
  .command('clear')
  .description('clear all todos')
  .action((source, destination) => {
    console.log('clear command called');
  });

program
  .command('show')
  .description('show all todos')
  .action((source, destination) => {
    console.log('show command called');
  });

program.parse(process.argv);
