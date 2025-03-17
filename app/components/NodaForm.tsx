'use client';

import { useState } from 'react';
import { Brand, NodaTime } from '../utils/taskDistribution';

interface NodaFormProps {
  onSubmit: (nodaTimes: NodaTime[]) => void;
}

export default function NodaForm({ onSubmit }: NodaFormProps) {
  const [nodaTimes, setNodaTimes] = useState<NodaTime[]>([
    { brand: 'BF', withdrawalTime: '' },
    { brand: 'CZ', withdrawalTime: '' },
    { brand: 'YB', withdrawalTime: '' }
  ]);

  const handleTimeChange = (brand: Brand, time: string) => {
    setNodaTimes(prev => 
      prev.map(item => 
        item.brand === brand ? { ...item, withdrawalTime: time } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert empty strings to current date if needed
    const processedTimes = nodaTimes.map(item => {
      if (!item.withdrawalTime) {
        return { ...item, withdrawalTime: new Date().toISOString() };
      }
      return item;
    });
    
    onSubmit(processedTimes);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Enter NODA Withdrawal Times</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {nodaTimes.map((item) => (
            <div key={item.brand} className="flex flex-col">
              <label className="font-medium mb-1">{item.brand} NODA Time:</label>
              <input 
                type="datetime-local" 
                value={item.withdrawalTime}
                onChange={(e) => handleTimeChange(item.brand, e.target.value)}
                className="border rounded-md p-2"
              />
            </div>
          ))}
        </div>
        <button 
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all"
        >
          Generate Task Distribution
        </button>
      </form>
    </div>
  );
} 