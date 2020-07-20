const os = require('os');
const path = require('path');
const home = process.env.HOME || os.homedir();
const defaultPath = path.join(home, '.todos');
const fs = require('fs');

const db = {
  read(filePath = defaultPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, {flag: 'a+'}, (error, data) => {
        if (error) return reject(error);

        let todoList;
        // todoList = data.toString() && JSON.parse(data.toString()) || []
        try {
          todoList = JSON.parse(data.toString());
        } catch (parseError) {
          todoList = []
        }

        resolve(todoList)
      });
    })
  },

  write(newTodoList, filePath = defaultPath) {
    newTodoList = JSON.stringify(newTodoList);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, newTodoList, (error) => {
        if (error) return reject(error);

        return resolve()
      });
    })
  }
}

module.exports = db