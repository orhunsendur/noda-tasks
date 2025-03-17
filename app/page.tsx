'use client';

import { useState } from 'react';
import NodaForm from './components/NodaForm';
import TaskList from './components/TaskList';
import { NodaTime, Task, distributeNodaTasks } from './utils/taskDistribution';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleFormSubmit = (nodaTimes: NodaTime[]) => {
    // Distribute tasks based on the NODA times
    const distributedTasks = distributeNodaTasks(nodaTimes);
    setTasks(distributedTasks);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Daily Task Distributor</h1>
        <p className="text-lg text-gray-600">
          Enter NODA withdrawal times for each brand to generate the task distribution
        </p>
      </div>
      
      <NodaForm onSubmit={handleFormSubmit} />
      <TaskList tasks={tasks} />
    </div>
  );
} 