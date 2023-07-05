import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getAllTasks } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h1>Task Management System</h1>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} onTaskDeleted={fetchTasks} />
    </div>
  );
}

export default App;
