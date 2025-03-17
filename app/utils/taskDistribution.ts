import { differenceInDays, parseISO } from 'date-fns';

export type Brand = 'BF' | 'CZ' | 'YB';

export interface NodaTime {
  brand: Brand;
  withdrawalTime: string; // ISO date string
}

export interface Task {
  type: string;
  brand?: Brand;
  priority: number;
  description: string;
}

// Function to check if a NODA time is older than 2 days
export const isOlderThanTwoDays = (withdrawalTime: string): boolean => {
  const today = new Date();
  const withdrawalDate = parseISO(withdrawalTime);
  
  return differenceInDays(today, withdrawalDate) > 2;
};

// Function to organize tasks based on the NODA withdrawal times
export const distributeNodaTasks = (nodaTimes: NodaTime[]): Task[] => {
  const tasks: Task[] = [];
  
  // Add standard tasks in their initial order
  tasks.push({ type: 'Other Methods BF', brand: 'BF', priority: 1, description: 'Process other methods for BF' });
  tasks.push({ type: 'Other Methods CZ', brand: 'CZ', priority: 2, description: 'Process other methods for CZ' });
  tasks.push({ type: 'Other Methods YB', brand: 'YB', priority: 3, description: 'Process other methods for YB' });
  
  // Process NODA tasks older than 2 days
  const oldNodaTasks = nodaTimes
    .filter(noda => isOlderThanTwoDays(noda.withdrawalTime))
    .sort((a, b) => {
      // Sort by age (oldest first)
      return parseISO(a.withdrawalTime).getTime() - parseISO(b.withdrawalTime).getTime();
    })
    .map((noda, index) => ({
      type: 'NODA Older Than 2 Days',
      brand: noda.brand,
      priority: 4 + index, // Priority starts at 4 and increases
      description: `Process NODA for ${noda.brand} (withdrawal time: ${new Date(noda.withdrawalTime).toLocaleDateString()})`,
    }));
  
  tasks.push(...oldNodaTasks);
  
  // Add remaining fixed tasks
  tasks.push({ type: 'Escalations', priority: 4 + oldNodaTasks.length, description: 'Handle escalations' });
  tasks.push({ type: 'Payfraud', priority: 5 + oldNodaTasks.length, description: 'Process payfraud cases' });
  tasks.push({ type: 'Fraud Tickets', priority: 6 + oldNodaTasks.length, description: 'Process fraud tickets' });
  tasks.push({ type: 'GA Tickets', priority: 7 + oldNodaTasks.length, description: 'Process GA tickets' });
  
  // Add up-to-date NODA tasks
  const upToDateNodaTasks = nodaTimes
    .filter(noda => !isOlderThanTwoDays(noda.withdrawalTime))
    .map((noda, index) => ({
      type: 'NODA Up To Date',
      brand: noda.brand,
      priority: 8 + oldNodaTasks.length + index,
      description: `Process NODA for ${noda.brand} (withdrawal time: ${new Date(noda.withdrawalTime).toLocaleDateString()})`,
    }));
  
  tasks.push(...upToDateNodaTasks);
  
  return tasks;
}; 