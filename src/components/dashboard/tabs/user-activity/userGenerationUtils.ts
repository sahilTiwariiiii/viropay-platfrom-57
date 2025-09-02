
import { format, subDays, subWeeks, subMonths } from 'date-fns';

export type UserStatus = 'active' | 'moderate' | 'inactive' | 'unassigned';

export type TimePeriod = 'all' | 'day' | 'week' | 'month';

export interface GeneratedUser {
  id: string;
  email: string;
  status: UserStatus;
  logins: number;
  timeSpent: {
    value: number;
    unit: string;
  };
  lastSeen: string;
  source: string;
}

// Helper to get a random date within a time range
const getRandomDate = (start: Date, end: Date, seed: number) => {
  // Use a deterministic approach with the seed
  const randomValue = Math.sin(seed) * 10000;
  const normalizedValue = (randomValue - Math.floor(randomValue));
  return new Date(start.getTime() + normalizedValue * (end.getTime() - start.getTime()));
};

// Helper to format date for last seen
const formatLastSeen = (date: Date) => {
  return format(date, 'MMM d, yyyy');
};

export const generateUsers = (appName: string, count: number, seed = 123): GeneratedUser[] => {
  const users: GeneratedUser[] = [];
  const now = new Date();
  
  // Ensure we have consistent distribution regardless of total count
  // 10% unassigned, 60% active, 20% moderate, 10% inactive
  const unassignedCount = Math.max(1, Math.round(count * 0.1)); 
  const activeCount = Math.max(1, Math.round(count * 0.6));
  const moderateCount = Math.max(1, Math.round(count * 0.2));
  const inactiveCount = count - unassignedCount - activeCount - moderateCount;
  
  // Used to verify our counts add up to the total
  console.log(`Distribution for ${appName}: Total: ${count}`);
  console.log(`Active: ${activeCount}, Moderate: ${moderateCount}, Inactive: ${inactiveCount}, Unassigned: ${unassignedCount}`);
  console.log(`Sum: ${activeCount + moderateCount + inactiveCount + unassignedCount}`);
  
  let userIndex = 0;
  
  // Generate active users
  for (let i = 0; i < activeCount; i++) {
    const currentSeed = seed + (i * 100) + 1;
    const userId = `user-${appName}-active-${i}`;
    
    // Ensure positive login numbers (10-30 logins)
    const logins = Math.abs(Math.floor((Math.sin(currentSeed) * 10000 % 20) + 10)); 
    
    // Ensure positive time spent values (10-30 hours)
    const timeSpentValue = Math.abs(Math.floor((Math.sin(currentSeed + 1) * 10000 % 20) + 10)); 
    const lastSeenDate = getRandomDate(subDays(now, 3), now, currentSeed + 2);
    
    // Generate user email deterministically
    const names = ['john', 'jane', 'michael', 'sarah', 'david', 'emma', 'alex', 'olivia', 'robert', 'sophia'];
    const surnames = ['smith', 'johnson', 'williams', 'jones', 'brown', 'davis', 'miller', 'wilson', 'moore', 'taylor'];
    const providers = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'enterprise.org'];
    
    const nameIndex = Math.abs(Math.floor(Math.sin(currentSeed + 3) * 10000)) % names.length;
    const surnameIndex = Math.abs(Math.floor(Math.sin(currentSeed + 4) * 10000)) % surnames.length;
    const providerIndex = Math.abs(Math.floor(Math.sin(currentSeed + 5) * 10000)) % providers.length;
    
    const randomName = names[nameIndex];
    const randomSurname = surnames[surnameIndex];
    const randomProvider = providers[providerIndex];
    
    const email = `${randomName}.${randomSurname}${i + 1}@${randomProvider}`.toLowerCase();
    
    // Only use SSO or Browser as source
    const sources = ['SSO', 'Browser'];
    const sourceIndex = Math.abs(Math.floor(Math.sin(currentSeed + 6) * 10000)) % sources.length;
    const source = sources[sourceIndex];
    
    users.push({
      id: userId,
      email: email,
      status: 'active',
      logins: logins,
      timeSpent: {
        value: timeSpentValue,
        unit: 'hours'
      },
      lastSeen: formatLastSeen(lastSeenDate),
      source: source
    });
    
    userIndex++;
  }
  
  // Generate moderate users
  for (let i = 0; i < moderateCount; i++) {
    const currentSeed = seed + (activeCount * 100) + (i * 100) + 1;
    const userId = `user-${appName}-moderate-${i}`;
    
    // Ensure positive login numbers (3-13 logins)
    const logins = Math.abs(Math.floor((Math.sin(currentSeed) * 10000 % 10) + 3)); 
    
    // Ensure positive time spent values (3-13 hours)
    const timeSpentValue = Math.abs(Math.floor((Math.sin(currentSeed + 1) * 10000 % 10) + 3));
    const lastSeenDate = getRandomDate(subDays(now, 10), subDays(now, 3), currentSeed + 2);
    
    // Generate user email deterministically  
    const names = ['john', 'jane', 'michael', 'sarah', 'david', 'emma', 'alex', 'olivia', 'robert', 'sophia'];
    const surnames = ['smith', 'johnson', 'williams', 'jones', 'brown', 'davis', 'miller', 'wilson', 'moore', 'taylor'];
    const providers = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'enterprise.org'];
    
    const nameIndex = Math.abs(Math.floor(Math.sin(currentSeed + 3) * 10000)) % names.length;
    const surnameIndex = Math.abs(Math.floor(Math.sin(currentSeed + 4) * 10000)) % surnames.length;
    const providerIndex = Math.abs(Math.floor(Math.sin(currentSeed + 5) * 10000)) % providers.length;
    
    const randomName = names[nameIndex];
    const randomSurname = surnames[surnameIndex];
    const randomProvider = providers[providerIndex];
    
    const email = `${randomName}.${randomSurname}${i + 100}@${randomProvider}`.toLowerCase();
    
    // Only use SSO or Browser as source
    const sources = ['SSO', 'Browser'];
    const sourceIndex = Math.abs(Math.floor(Math.sin(currentSeed + 6) * 10000)) % sources.length;
    const source = sources[sourceIndex];
    
    users.push({
      id: userId,
      email: email,
      status: 'moderate',
      logins: logins,
      timeSpent: {
        value: timeSpentValue,
        unit: 'hours'
      },
      lastSeen: formatLastSeen(lastSeenDate),
      source: source
    });
    
    userIndex++;
  }
  
  // Generate inactive users
  for (let i = 0; i < inactiveCount; i++) {
    const currentSeed = seed + (activeCount * 100) + (moderateCount * 100) + (i * 100) + 1;
    const userId = `user-${appName}-inactive-${i}`;
    
    // Ensure positive login numbers (1-4 logins)
    const logins = Math.abs(Math.floor((Math.sin(currentSeed) * 10000 % 3) + 1)); 
    
    // Ensure positive time spent values (1-4 hours)
    const timeSpentValue = Math.abs(Math.floor((Math.sin(currentSeed + 1) * 10000 % 3) + 1)); 
    const lastSeenDate = getRandomDate(subDays(now, 30), subDays(now, 10), currentSeed + 2);
    
    // Generate user email deterministically
    const names = ['john', 'jane', 'michael', 'sarah', 'david', 'emma', 'alex', 'olivia', 'robert', 'sophia'];
    const surnames = ['smith', 'johnson', 'williams', 'jones', 'brown', 'davis', 'miller', 'wilson', 'moore', 'taylor'];
    const providers = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'enterprise.org'];
    
    const nameIndex = Math.abs(Math.floor(Math.sin(currentSeed + 3) * 10000)) % names.length;
    const surnameIndex = Math.abs(Math.floor(Math.sin(currentSeed + 4) * 10000)) % surnames.length;
    const providerIndex = Math.abs(Math.floor(Math.sin(currentSeed + 5) * 10000)) % providers.length;
    
    const randomName = names[nameIndex];
    const randomSurname = surnames[surnameIndex];
    const randomProvider = providers[providerIndex];
    
    const email = `${randomName}.${randomSurname}${i + 200}@${randomProvider}`.toLowerCase();
    
    // Only use SSO or Browser as source
    const sources = ['SSO', 'Browser'];
    const sourceIndex = Math.abs(Math.floor(Math.sin(currentSeed + 6) * 10000)) % sources.length;
    const source = sources[sourceIndex];
    
    users.push({
      id: userId,
      email: email,
      status: 'inactive',
      logins: logins,
      timeSpent: {
        value: timeSpentValue,
        unit: 'hours'
      },
      lastSeen: formatLastSeen(lastSeenDate),
      source: source
    });
    
    userIndex++;
  }
  
  // Generate unassigned users
  for (let i = 0; i < unassignedCount; i++) {
    const currentSeed = seed + (activeCount * 100) + (moderateCount * 100) + (inactiveCount * 100) + (i * 100) + 1;
    const userId = `unassigned-${appName}-${i}`;
    
    users.push({
      id: userId,
      email: `unassigned${i + 1}@viropay.com`,
      status: 'unassigned',
      logins: 0,
      timeSpent: {
        value: 0,
        unit: 'hours'
      },
      lastSeen: 'Never',
      source: 'License Pool'
    });
    
    userIndex++;
  }
  
  return users;
};

export const filterUsersByTimePeriod = (users: GeneratedUser[], timePeriod: TimePeriod): GeneratedUser[] => {
  if (timePeriod === 'all') {
    return users;
  }
  
  const now = new Date();
  let cutoffDate: Date;
  
  switch (timePeriod) {
    case 'day':
      cutoffDate = subDays(now, 1);
      break;
    case 'week':
      cutoffDate = subWeeks(now, 1);
      break;
    case 'month':
      cutoffDate = subMonths(now, 1);
      break;
    default:
      return users;
  }
  
  // Helper to convert lastSeen string to Date
  const parseLastSeen = (lastSeen: string): Date => {
    if (lastSeen === 'Never') return new Date(0);
    try {
      // Try to parse the format we know we generate above
      return new Date(lastSeen);
    } catch {
      // Fallback to current date if parsing fails
      return new Date();
    }
  };
  
  // Filter out unassigned users from time filter (they should always be visible)
  const unassignedUsers = users.filter(user => user.status === 'unassigned');
  
  // Filter active users by time period
  const filteredActiveUsers = users
    .filter(user => user.status !== 'unassigned')
    .filter(user => {
      const lastSeenDate = parseLastSeen(user.lastSeen);
      return lastSeenDate >= cutoffDate;
    });
  
  // Combine and return both sets
  return [...filteredActiveUsers, ...unassignedUsers];
};

export const getStatusCounts = (users: GeneratedUser[]) => {
  const counts = {
    all: users.length,
    active: 0,
    moderate: 0,
    inactive: 0,
    unassigned: 0
  };
  
  users.forEach(user => {
    if (user.status === 'active') counts.active++;
    else if (user.status === 'moderate') counts.moderate++;
    else if (user.status === 'inactive') counts.inactive++;
    else if (user.status === 'unassigned') counts.unassigned++;
  });
  
  return counts;
};
