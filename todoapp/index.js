// const express = require('express');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// app.use(express.json());

// // Read todo data from todo.json file
// function readTodoData() {
//   const rawData = fs.readFileSync('todo.json');
//   return JSON.parse(rawData);
// }

// // Write todo data to todo.json file
// function writeTodoData(data) {
//   fs.writeFileSync('todo.json', JSON.stringify(data));
// }

// // GET all todos
// app.get('/todos', (req, res) => {
//   const todos = readTodoData();
//   res.json(todos);
// });

// // POST a new todo
// app.post('/todos', (req, res) => {
//   const todos = readTodoData();
//   const newTodo = req.body;
//   todos.push(newTodo);
//   writeTodoData(todos);
//   res.json(newTodo);
// });

// // PUT (update) a todo
// app.put('/todos/:id', (req, res) => {
//   const todos = readTodoData();
//   const todoId = req.params.id;
//   const updatedTodo = req.body;

//   // Find the todo with the provided id and update it
//   const todoIndex = todos.findIndex(todo => todo.id === todoId);
//   if (todoIndex !== -1) {
//     todos[todoIndex] = updatedTodo;
//     writeTodoData(todos);
//     res.json(updatedTodo);
//   } else {
//     res.status(404).json({ error: 'Todo not found' });
//   }
// });

// // DELETE a todo
// app.delete('/todos/:id', (req, res) => {
//   const todos = readTodoData();
//   const todoId = req.params.id;

//   // Find the todo with the provided id and remove it
//   const todoIndex = todos.findIndex(todo => todo.id === todoId);
//   if (todoIndex !== -1) {
//     const deletedTodo = todos.splice(todoIndex, 1)[0];
//     writeTodoData(todos);
//     res.json(deletedTodo);
//   } else {
//     res.status(404).json({ error: 'Todo not found' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Todo app server is running on port ${port}`);
// });
// todoList.js

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todoListFile = 'todoListData.json';

function loadTodoList() {
  try {
    const data = fs.readFileSync(todoListFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveTodoList(todoList) {
  const data = JSON.stringify(todoList, null, 2);
  fs.writeFileSync(todoListFile, data);
}

function showTodoList() {
  const todoList = loadTodoList();
  if (todoList.length === 0) {
    console.log('Todo List is empty.');
  } else {
    console.log('Todo List:');
    todoList.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  }
}

function addTask(task) {
  if (!task) {
    console.log('Please provide a task.');
    return;
  }

  const todoList = loadTodoList();
  todoList.push(task);
  saveTodoList(todoList);
  console.log(`Task "${task}" added to the Todo List.`);
}

function updateTask(index, updatedTask) {
  if (!updatedTask) {
    console.log('Please provide an updated task.');
    return;
  }

  const todoList = loadTodoList();
  if (index < 0 || index >= todoList.length) {
    console.log('Invalid task index.');
    return;
  }

  todaoList[index] = updatedTask;
  saveTodoList(todoList);
  console.log(`Task at index ${index + 1} updated to "${updatedTask}".`);
}

function deleteTask(index) {
  const todoList = loadTodoList();
  if (index < 0 || index >= todoList.length) {
    console.log('Invalid task index.');
    return;
  }

  const removedTask = todoList.splice(index, 1)[0];
  saveTodoList(todoList);
  console.log(`Task "${removedTask}" at index ${index + 1} deleted.`);
}

function promptUser() {
  rl.question('Enter a command (add/update/delete): ', (command) => {
    switch (command) {
      case 'add':
        rl.question('Enter the task to add: ', (task) => {
          addTask(task);
          promptUser();
        });
        break;
      case 'update':
        rl.question('Enter the task index to update: ', (index) => {
          rl.question('Enter the updated task: ', (updatedTask) => {
            updateTask(Number(index) - 1, updatedTask);
            promptUser();
          });
        });
        break;
      case 'delete':
        rl.question('Enter the task index to delete: ', (index) => {
          deleteTask(Number(index) - 1);
          promptUser();
        });
        break;
 
    }
  });
}

promptUser();