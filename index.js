const db = require('./db.js');

module.exports.add = async (todoTitle, status) => {
  const todoList = await db.read();

  todoList.push({title: todoTitle, status: 'done' === status ? 'done' : 'undo'});

  await db.write(todoList)
};

module.exports.overWrite = async (todoList) => {
  await db.write(todoList)
};

module.exports.clear = async () => {
  await db.write([])
};

module.exports.show = async () => {
  return await db.read();
};
