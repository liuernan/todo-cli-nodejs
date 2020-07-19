const os = require('os');
const path = require('path');
const fs = require('fs');

const filePath = path.join(process.env.HOME || os.homedir(), '.todos.txt');

// fs.open(filePath, 'a+', (error)=>{
//   console.log(error)
// });

module.exports.add = (todoTitle, done) => {
  console.log('add called with params: ', todoTitle, done)
}

module.exports.clear = () => {
  console.log('clear called');
}

module.exports.show = () => {
  console.log('show called');
}