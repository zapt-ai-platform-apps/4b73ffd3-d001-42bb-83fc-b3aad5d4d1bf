import React from 'react';
import CreateTaskForm from './components/CreateTaskForm';

export default function CreateTask() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Create Task for Admin</h2>
      <CreateTaskForm />
    </div>
  );
}