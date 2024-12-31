import React, { useState } from 'react';
import { createTask } from '../api/createTask';

export default function CreateTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    setLoading(true);
    const taskData = {
      title,
      description,
      priority: parseInt(priority),
      dueDate,
      assignedTo: 'admin', // Assigning to admin
    };

    try {
      await createTask(taskData);
      setTitle('');
      setDescription('');
      setPriority('1');
      setDueDate('');
      alert('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="w-full p-2 border rounded box-border"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <textarea
        className="w-full p-2 border rounded box-border"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      ></textarea>
      <select
        className="w-full p-2 border rounded box-border"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        disabled={loading}
      >
        <option value="1">Low Priority</option>
        <option value="2">Medium Priority</option>
        <option value="3">High Priority</option>
      </select>
      <input
        type="date"
        className="w-full p-2 border rounded box-border"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        disabled={loading}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
        onClick={handleCreateTask}
        disabled={loading}
      >
        {loading ? 'Creating Task...' : 'Create Task'}
      </button>
    </div>
  );
}