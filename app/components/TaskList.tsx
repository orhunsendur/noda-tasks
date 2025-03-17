'use client';

import { Task } from '../utils/taskDistribution';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  // Group tasks by type to show them in sections
  const groupedTasks: { [key: string]: Task[] } = {};
  
  tasks.forEach(task => {
    if (!groupedTasks[task.type]) {
      groupedTasks[task.type] = [];
    }
    groupedTasks[task.type].push(task);
  });

  // Get sorted task types based on priority
  const taskTypes = Object.keys(groupedTasks).sort((a, b) => {
    const minPriorityA = Math.min(...groupedTasks[a].map(t => t.priority));
    const minPriorityB = Math.min(...groupedTasks[b].map(t => t.priority));
    return minPriorityA - minPriorityB;
  });

  const getTypeColor = (type: string): string => {
    switch(type) {
      case 'NODA Older Than 2 Days':
        return 'bg-red-100 border-red-300';
      case 'Escalations':
        return 'bg-orange-100 border-orange-300';
      case 'Payfraud':
      case 'Fraud Tickets':
        return 'bg-yellow-100 border-yellow-300';
      case 'NODA Up To Date':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-blue-100 border-blue-300';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks to display. Please submit NODA times.</p>
      ) : (
        <div>
          {taskTypes.map(type => (
            <div key={type} className="mb-6">
              <h3 className="font-medium text-lg mb-2">{type}</h3>
              <div className="space-y-2">
                {groupedTasks[type]
                  .sort((a, b) => a.priority - b.priority)
                  .map((task, index) => (
                    <div 
                      key={`${task.type}-${task.brand || ''}-${index}`}
                      className={`p-3 rounded-md border ${getTypeColor(task.type)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{task.description}</p>
                          {task.brand && (
                            <span className="text-xs font-semibold bg-gray-200 rounded-full px-2 py-1 mt-1 inline-block">
                              {task.brand}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">Priority: {task.priority}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 