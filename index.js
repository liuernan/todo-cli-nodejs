const db = require('./db.js');

module.exports.add = async (todoTitle, status) => {
  // 读文件取原来的 todoList
  const todoList = await db.read();

  // 加入新的 todoTitle
  todoList.push({title: todoTitle, status: 'done' === status ? 'done' : 'undo'});

  // 重新写入文件，直接覆盖
  await db.write(todoList)
};

module.exports.clear = async () => {
  await db.write([])
};

module.exports.show = async () => {
  const todoList = await db.read();
  console.log(todoList)
};
