const db = require('./db.js');

module.exports.add = (todoTitle, done) => {
}

module.exports.clear = () => {
}

module.exports.show = async () => {
  const todoList = await db.read();
  console.log(todoList)
}
