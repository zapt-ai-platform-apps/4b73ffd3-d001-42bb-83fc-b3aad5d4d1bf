import { supabase } from '../supabaseClient';

export async function createTask(taskData) {
  console.log('Creating task...');

  const { title, description, priority, dueDate, assignedTo } = taskData;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session.access_token;
    const response = await fetch('/api/createTask', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate,
        assignedTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to create task:', errorData);
      throw new Error('Failed to create task');
    }
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}