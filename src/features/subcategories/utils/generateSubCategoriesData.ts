// Define the SubCategory type
export interface SubCategory {
  id: string;
  name: string;
  category: string;
  description: string;
  count: number;
}

/**
 * Generates a simple ID for mock data
 * @returns A string ID
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Generates mock subcategories data for development and testing
 * @returns Array of subcategory objects
 */
export const generateMockSubCategories = (): SubCategory[] => {
  return [
    {
      id: generateId(),
      name: 'CRM Software',
      category: 'Software',
      description: 'Customer Relationship Management tools',
      count: 15
    },
    {
      id: generateId(),
      name: 'Project Management',
      category: 'Software',
      description: 'Tools for managing projects and tasks',
      count: 8
    },
    {
      id: generateId(),
      name: 'Accounting Software',
      category: 'Software',
      description: 'Financial management applications',
      count: 12
    },
    {
      id: generateId(),
      name: 'Office Supplies',
      category: 'Hardware',
      description: 'General office equipment and supplies',
      count: 24
    },
    {
      id: generateId(),
      name: 'Computer Hardware',
      category: 'Hardware',
      description: 'Computers, servers, and components',
      count: 18
    },
    {
      id: generateId(),
      name: 'Network Equipment',
      category: 'Hardware',
      description: 'Routers, switches, and networking gear',
      count: 9
    },
    {
      id: generateId(),
      name: 'Cloud Services',
      category: 'Services',
      description: 'Cloud hosting and infrastructure services',
      count: 14
    },
    {
      id: generateId(),
      name: 'Consulting',
      category: 'Services',
      description: 'Professional consulting services',
      count: 7
    },
    {
      id: generateId(),
      name: 'Training',
      category: 'Services',
      description: 'Professional development and training',
      count: 11
    }
  ];
};