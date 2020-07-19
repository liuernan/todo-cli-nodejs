const os = require('os');
const path = require('path');
const fs = require('fs');
const filePath = path.join(process.env.HOME || os.homedir(), '.todos');

const db = {
  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, {flag: 'a+'}, (error, data) => {
        if (error) {
          return reject(error)
        }

        let todoList;
        // todoList = data.toString() && JSON.parse(data.toString()) || []
        try {
          todoList = JSON.parse(JSON.stringify(data.toString()));
        } catch (parseError) {
          todoList = []
        }

        resolve(todoList)
      });
    })
  },
  write() {
  }
}

module.exports = db