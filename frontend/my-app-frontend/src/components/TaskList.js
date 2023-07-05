import React from 'react';
import { deleteTask } from '../services/taskService';

function TaskList({ tasks, onTaskDeleted }) {
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      onTaskDeleted();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Status: {task.status}</p>
                <p>Assigned User: {task.assignedUser}</p>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
