
const Task = require('../models/Task');

// Controller functions for task CRUD operations
exports.getAllTasks = (req, res) => {
  Task.find()
    .then(tasks => {
      res.status(200).send(tasks);
    })
    .catch(error => {
      res.status(500).send({ message: "Error occur while fetching the data" });
    });
};

exports.createTask = (req, res) => {
  const { title, description, dueDate, status, assignedUser } = req.body;
  
  const newTask = new Task({
    title,
    description,
    dueDate,
    status,
    assignedUser,
  });

  newTask.create()
    .then(task => {
      res.status(201).send(task);
    })
    .catch(error => {
      res.status(500).send({ message: "error occur while creating the task" });
    });
};

exports.updateTask = (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, dueDate, status, assignedUser } = req.body;
  
  Task.findByIdAndUpdate(taskId, {
    title,
    description,
    dueDate,
    status,
    assignedUser,
  }, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.status(200).send(task);
    })
    .catch(error => {
      res.status(500).send({ message: 'An error occurred while updating the task' });
    });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.taskId;
  
  Task.findByIdAndRemove(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.status(200).send({ message: 'Task deleted successfully' });
    })
    .catch(error => {
      res.status(500).send({ message: 'An error occurred while deleting the task' });
    });
};
