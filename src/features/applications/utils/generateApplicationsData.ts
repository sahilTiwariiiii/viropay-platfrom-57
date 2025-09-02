
import { Application } from '../types';

// List of real company logos with matching names
const realCompanies = [
  { name: 'Microsoft Office', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png' },
  { name: 'IBM Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png' },
  { name: 'Google Workspace', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png' },
  { name: 'Adobe Creative Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1200px-Adobe_Creative_Cloud_rainbow_icon.svg.png' },
  { name: 'Atlassian Suite', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Atlassian_Logo.svg/2560px-Atlassian_Logo.svg.png' },
  { name: 'GitHub Enterprise', logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
  { name: 'LinkedIn Sales', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png' },
  { name: 'Slack Business+', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png' },
  { name: 'Zoom Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Zoom_Communications_Logo.svg/1200px-Zoom_Communications_Logo.svg.png' },
  { name: 'Salesforce CRM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Salesforce_logo.svg/2560px-Salesforce_logo.svg.png' },
  { name: 'Dropbox Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dropbox_logo.svg/2560px-Dropbox_logo.svg.png' },
  { name: 'Asana Project', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asana_logo.svg/1280px-Asana_logo.svg.png' },
  { name: 'HubSpot CRM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Hubspot-logo.png/2560px-Hubspot-logo.png' },
  { name: 'Trello Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2560px-Trello-logo-blue.svg.png' },
  { name: 'Notion Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' }
];

// List of different companies for archived applications
const archivedCompanies = [
  { name: 'Evernote Teams', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Evernote_logo_2018.svg/1200px-Evernote_logo_2018.svg.png' },
  { name: 'Intercom Support', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Intercom_2023_icon.svg/2048px-Intercom_2023_icon.svg.png' },
  { name: 'Basecamp Project', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Basecamp_Logo.svg/2560px-Basecamp_Logo.svg.png' },
  { name: 'Zendesk Suite', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Zendesk_logo.svg/2560px-Zendesk_logo.svg.png' },
  { name: 'Freshdesk Support', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Freshdesk_logo.svg/2560px-Freshdesk_logo.svg.png' },
  { name: 'Box Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Box%2C_Inc._logo.svg/1200px-Box%2C_Inc._logo.svg.png' },
  { name: 'Monday.com Work', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Monday.com_logo.png/1200px-Monday.com_logo.png' },
  { name: 'Airtable Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Airtable-logo-blue.png/1200px-Airtable-logo-blue.png' },
  { name: 'Wrike Management', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Wrike_logo_2020.svg/2560px-Wrike_logo_2020.svg.png' },
  { name: 'InVision Design', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Invision_logo.svg/2560px-Invision_logo.svg.png' },
  { name: 'ClickUp Teams', logo: 'https://clickup.com/images/brand-assets/logo-symbol-color.svg' },
  { name: 'Miro Collaboration', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Miro_Logo.svg/1200px-Miro_Logo.svg.png' },
  { name: 'PagerDuty Alerts', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/PagerDuty_Logo.svg/2560px-PagerDuty_Logo.svg.png' },
  { name: 'Segment Analytics', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Segment_logo.svg/1200px-Segment_logo.svg.png' },
  { name: 'Figma Design', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png' }
];

// Categories for applications
const categories = ['Design', 'Finance', 'Marketing', 'Productivity', 'Communication', 'Development', 'Analytics', 'CRM', 'HR', 'Project Management'];

// Generate a dataset with exactly 78 active applications and 15 archived applications
export const generateExtendedApplications = (): Application[] => {
  const extendedApps: Application[] = [];
  
  // Generate exactly 78 active applications
  for (let i = 0; i < 78; i++) {
    const companyIndex = i % realCompanies.length;
    const company = realCompanies[companyIndex];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Calculate a random cost between €100 and €1600
    const monthlyCost = Math.floor(Math.random() * 1500) + 100;
    const yearlySpend = monthlyCost * 12;
    
    // Generate owner data for some applications
    let owner = '';
    let ownerInitials = '';
    let ownerStatus: 'assigned' | 'not-assigned' = 'not-assigned';
    
    if (Math.random() > 0.3) { // 70% chance to have an owner
      const ownerNames = [
        'Jerry van der Horst',
        'Ruben Attena',
        'Sarah Williams',
        'Michael Chen',
        'Priya Patel',
        'Emma Johnson',
        'Daniel Smith'
      ];
      owner = ownerNames[Math.floor(Math.random() * ownerNames.length)];
      ownerInitials = owner.split(' ').map(part => part[0]).join('');
      ownerStatus = 'assigned';
    }
    
    const app: Application = {
      id: `app-${i + 1}`,
      name: company.name,
      description: `Enterprise subscription for ${company.name}`,
      logo: '',
      logoUrl: company.logo,
      category: category,
      cost: monthlyCost, 
      amount: `€${monthlyCost} / mo`,
      yearlySpend: yearlySpend,
      users: Math.floor(Math.random() * 50) + 5, // Random users between 5 and 55
      owner: owner,
      ownerInitials: ownerInitials,
      ownerStatus: ownerStatus,
      status: 'active',
      nextPayment: Math.random() > 0.2 ? new Date(new Date().getTime() + Math.random() * 30 * 86400000).toLocaleDateString() : '', // 20% chance of empty next payment
      renewalDate: new Date(new Date().getTime() + Math.random() * 365 * 86400000), // Random renewal date within the next year
      lastUpdated: new Date()
    };
    
    extendedApps.push(app);
  }
  
  // Add archived applications using different company names (exactly 15)
  for (let i = 0; i < 15; i++) {
    const company = archivedCompanies[i % archivedCompanies.length];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    const monthlyCost = Math.floor(Math.random() * 1500) + 100;
    const yearlySpend = monthlyCost * 12;
    
    // Generate owner data for some applications
    let owner = '';
    let ownerInitials = '';
    let ownerStatus: 'assigned' | 'not-assigned' = 'not-assigned';
    
    if (Math.random() > 0.5) { // 50% chance to have an owner
      const ownerNames = [
        'Jerry van der Horst',
        'Ruben Attena',
        'Sarah Williams',
        'Michael Chen',
        'Priya Patel',
        'Emma Johnson',
        'Daniel Smith'
      ];
      owner = ownerNames[Math.floor(Math.random() * ownerNames.length)];
      ownerInitials = owner.split(' ').map(part => part[0]).join('');
      ownerStatus = 'assigned';
    }
    
    const app: Application = {
      id: `app-archived-${i + 1}`,
      name: company.name,
      description: `Archived subscription for ${company.name}`,
      logo: '',
      logoUrl: company.logo,
      category: category,
      cost: monthlyCost,
      amount: `€${monthlyCost} / mo`,
      yearlySpend: yearlySpend,
      users: Math.floor(Math.random() * 20) + 2,
      owner: owner,
      ownerInitials: ownerInitials,
      ownerStatus: ownerStatus,
      status: 'archived',
      nextPayment: '',
      renewalDate: new Date(new Date().getTime() - Math.random() * 30 * 86400000), // Random date in the past month
      lastUpdated: new Date(new Date().getTime() - Math.random() * 60 * 86400000) // Random update date in the past two months
    };
    
    extendedApps.push(app);
  }
  
  return extendedApps;
};
