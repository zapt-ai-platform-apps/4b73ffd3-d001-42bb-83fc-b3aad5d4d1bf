import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import TasksList from './TasksList';
import CreateTask from './CreateTask';

export default function App(){
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Sign in with ZAPT</h1>
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-4 inline-block">Visit ZAPT</a>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'apple']}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">TaskMaster</h1>
        <button
          className="text-blue-500 underline cursor-pointer"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </header>

      <main className="flex-grow p-4">
        <TasksList />
        <CreateTask />
      </main>

      <footer className="bg-white p-4 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">Made on ZAPT</a>
      </footer>
    </div>
  );
}