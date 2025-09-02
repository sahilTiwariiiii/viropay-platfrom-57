
import { Contract } from '../types';

export const contractsData: Contract[] = [
  {
    id: "1",
    app: {
      id: "1",
      name: "Slack",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
      category: "Communication"
    },
    vendor: "Slack Technologies, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-06-15",
    endDate: "2025-06-14",
    renewalDate: "2025-06-15",
    renewalType: "auto",
    value: "€4,800",
    paymentFrequency: "annual",
    owner: "John Smith",
    notes: "Enterprise plan for the entire organization",
    term: "24 months"
  },
  {
    id: "2",
    app: {
      id: "2",
      name: "Notion",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      category: "Productivity"
    },
    vendor: "Notion Labs, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-07-03",
    endDate: "2025-07-02",
    renewalDate: "2025-07-03",
    renewalType: "auto",
    value: "€3,840",
    paymentFrequency: "annual",
    owner: "Emma Johnson",
    notes: "Team plan with unlimited blocks"
  },
  {
    id: "3",
    app: {
      id: "3",
      name: "Figma",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      category: "Design"
    },
    vendor: "Figma, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-22",
    endDate: "2025-08-21",
    renewalDate: "2025-08-22",
    renewalType: "manual",
    value: "€2,160",
    paymentFrequency: "annual",
    owner: "Michael Brown",
    notes: "Professional plan for design team"
  },
  {
    id: "4",
    app: {
      id: "4",
      name: "Google Workspace",
      logoUrl: "https://workspace.google.com/static/img/products/png/drive.png?cache=1",
      category: "Productivity"
    },
    vendor: "Google LLC",
    status: "active",
    type: "subscription",
    startDate: "2023-06-05",
    endDate: "2025-06-04",
    renewalDate: "2025-06-05",
    renewalType: "auto",
    value: "€14,400",
    paymentFrequency: "annual",
    owner: "Sarah Wilson",
    notes: "Business Standard plan"
  },
  {
    id: "5",
    app: {
      id: "5",
      name: "Microsoft 365",
      logoUrl: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
      category: "Productivity"
    },
    vendor: "Microsoft Corporation",
    status: "active",
    type: "subscription",
    startDate: "2023-07-12",
    endDate: "2025-07-11",
    renewalDate: "2025-07-12",
    renewalType: "auto",
    value: "€19,800",
    paymentFrequency: "annual",
    owner: "Robert Davis",
    notes: "Business Premium plan"
  },
  {
    id: "6",
    app: {
      id: "6",
      name: "Zoom",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1280px-Zoom_Communications_Logo.svg.png",
      category: "Communication"
    },
    vendor: "Zoom Video Communications, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2024-05-01",
    endDate: "2025-08-31",
    renewalDate: "2025-09-01",
    renewalType: "manual",
    value: "€6,240",
    paymentFrequency: "annual",
    owner: "Jennifer Taylor",
    notes: "Business plan"
  },
  {
    id: "7",
    app: {
      id: "7",
      name: "Salesforce",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png",
      category: "CRM"
    },
    vendor: "Salesforce, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-08",
    endDate: "2025-08-07",
    renewalDate: "2025-08-08",
    renewalType: "auto",
    value: "€11,400",
    paymentFrequency: "annual",
    owner: "Daniel Miller",
    notes: "Enterprise plan for sales team"
  },
  {
    id: "8",
    app: {
      id: "8",
      name: "HubSpot",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Hubspot-logo.png/2048px-Hubspot-logo.png",
      category: "Marketing"
    },
    vendor: "HubSpot, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-07-28",
    endDate: "2025-07-27",
    renewalDate: "2025-07-28",
    renewalType: "auto",
    value: "€9,360",
    paymentFrequency: "annual",
    owner: "Lisa Anderson",
    notes: "Marketing Hub Professional"
  },
  {
    id: "9",
    app: {
      id: "9",
      name: "Adobe Creative Cloud",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1200px-Adobe_Creative_Cloud_rainbow_icon.svg.png",
      category: "Design"
    },
    vendor: "Adobe Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-06-30",
    endDate: "2025-06-29",
    renewalDate: "2025-06-30",
    renewalType: "manual",
    value: "€7,560",
    paymentFrequency: "annual",
    owner: "Jessica Martinez",
    notes: "All Apps plan for design team"
  },
  {
    id: "10",
    app: {
      id: "10",
      name: "Dropbox",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dropbox_logo_%282023%29.svg/2048px-Dropbox_logo_%282023%29.svg.png",
      category: "Storage"
    },
    vendor: "Dropbox, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-09-15",
    endDate: "2025-09-14",
    renewalDate: "2025-09-15",
    renewalType: "auto",
    value: "€5,040",
    paymentFrequency: "annual",
    owner: "Unassigned",
    notes: "Business plan for file storage"
  },
  {
    id: "11",
    app: {
      id: "11",
      name: "Mailchimp",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Mailchimp_corporate_logo.svg/2048px-Mailchimp_corporate_logo.svg.png",
      category: "Email Marketing"
    },
    vendor: "Intuit Inc.",
    status: "expired",
    type: "subscription",
    startDate: "2022-06-15",
    endDate: "2023-06-14",
    renewalDate: "2023-06-15",
    renewalType: "manual",
    value: "€2,280",
    paymentFrequency: "annual",
    owner: "Kevin Wilson",
    notes: "Standard plan for email marketing"
  },
  {
    id: "12",
    app: {
      id: "12",
      name: "Atlassian Jira",
      logoUrl: "https://ww1.freelogovectors.net/wp-content/uploads/2023/07/jira-logo-freelogovectors.net_.png",
      category: "Project Management"
    },
    vendor: "Atlassian Corporation Plc",
    status: "expired",
    type: "subscription",
    startDate: "2022-08-01",
    endDate: "2023-07-31",
    renewalDate: "2023-08-01",
    renewalType: "manual",
    value: "€4,200",
    paymentFrequency: "annual",
    owner: "Thomas Clark",
    notes: "Software plan for development team"
  },
  // Additional contracts to make it 34 total
  {
    id: "13",
    app: {
      id: "13",
      name: "Asana",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asana_logo.svg/1200px-Asana_logo.svg.png",
      category: "Project Management"
    },
    vendor: "Asana, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    renewalDate: "2024-09-01",
    renewalType: "auto",
    value: "€5,760",
    paymentFrequency: "annual",
    owner: "Mark Johnson",
    notes: "Business plan for project management"
  },
  {
    id: "14",
    app: {
      id: "14",
      name: "Trello",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2560px-Trello-logo-blue.svg.png",
      category: "Project Management"
    },
    vendor: "Atlassian Corporation Plc",
    status: "active",
    type: "subscription",
    startDate: "2023-10-15",
    endDate: "2024-10-14",
    renewalDate: "2024-10-15",
    renewalType: "auto",
    value: "€3,600",
    paymentFrequency: "annual",
    owner: "Linda White",
    notes: "Premium plan for project management"
  },
  {
    id: "15",
    app: {
      id: "15",
      name: "Canva",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/1200px-Canva_icon_2021.svg.png",
      category: "Design"
    },
    vendor: "Canva Pty Ltd",
    status: "active",
    type: "subscription",
    startDate: "2023-11-10",
    endDate: "2024-11-09",
    renewalDate: "2024-11-10",
    renewalType: "auto",
    value: "€2,880",
    paymentFrequency: "annual",
    owner: "Sophia Martinez",
    notes: "Pro plan for design team"
  },
  {
    id: "16",
    app: {
      id: "16",
      name: "Zendesk",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Zendesk_logo.svg/1200px-Zendesk_logo.svg.png",
      category: "Customer Service"
    },
    vendor: "Zendesk, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-15",
    endDate: "2024-08-14",
    renewalDate: "2024-08-15",
    renewalType: "auto",
    value: "€8,400",
    paymentFrequency: "annual",
    owner: "David Wilson",
    notes: "Suite Enterprise plan for customer service"
  },
  {
    id: "17",
    app: {
      id: "17",
      name: "Intercom",
      logoUrl: "https://companieslogo.com/img/orig/ICMM-fd33173c.png?t=1665518734",
      category: "Customer Service"
    },
    vendor: "Intercom, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-09-20",
    endDate: "2024-09-19",
    renewalDate: "2024-09-20",
    renewalType: "auto",
    value: "€7,200",
    paymentFrequency: "annual",
    owner: "Rebecca Thompson",
    notes: "Pro plan for customer engagement"
  },
  {
    id: "18",
    app: {
      id: "18",
      name: "Monday.com",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Monday_logo.svg/2560px-Monday_logo.svg.png",
      category: "Project Management"
    },
    vendor: "monday.com Ltd.",
    status: "active",
    type: "subscription",
    startDate: "2023-10-05",
    endDate: "2024-10-04",
    renewalDate: "2024-10-05",
    renewalType: "auto",
    value: "€6,480",
    paymentFrequency: "annual",
    owner: "Christopher Brown",
    notes: "Pro plan for project management"
  },
  {
    id: "19",
    app: {
      id: "19",
      name: "QuickBooks",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Quickbooks_logo.png/1200px-Quickbooks_logo.png",
      category: "Finance"
    },
    vendor: "Intuit Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-11-15",
    endDate: "2024-11-14",
    renewalDate: "2024-11-15",
    renewalType: "auto",
    value: "€3,600",
    paymentFrequency: "annual",
    owner: "Benjamin Davis",
    notes: "Advanced plan for accounting"
  },
  {
    id: "20",
    app: {
      id: "20",
      name: "GitHub",
      logoUrl: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
      category: "Development"
    },
    vendor: "GitHub, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-25",
    endDate: "2024-08-24",
    renewalDate: "2024-08-25",
    renewalType: "auto",
    value: "€7,800",
    paymentFrequency: "annual",
    owner: "Matthew Wilson",
    notes: "Enterprise plan for development team"
  },
  {
    id: "21",
    app: {
      id: "21",
      name: "DocuSign",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/DocuSign_logo.svg/1200px-DocuSign_logo.svg.png",
      category: "Legal"
    },
    vendor: "DocuSign, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-09-10",
    endDate: "2024-09-09",
    renewalDate: "2024-09-10",
    renewalType: "auto",
    value: "€4,560",
    paymentFrequency: "annual",
    owner: "Elizabeth Taylor",
    notes: "Business Pro plan for electronic signatures"
  },
  {
    id: "22",
    app: {
      id: "22",
      name: "Miro",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Miro_Logo.svg/1200px-Miro_Logo.svg.png",
      category: "Collaboration"
    },
    vendor: "Miro",
    status: "active",
    type: "subscription",
    startDate: "2023-10-20",
    endDate: "2024-10-19",
    renewalDate: "2024-10-20",
    renewalType: "auto",
    value: "€5,160",
    paymentFrequency: "annual",
    owner: "Jonathan Clark",
    notes: "Business plan for whiteboarding"
  },
  {
    id: "23",
    app: {
      id: "23",
      name: "Airtable",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/1200px-Airtable_Logo.svg.png",
      category: "Collaboration"
    },
    vendor: "Airtable",
    status: "active",
    type: "subscription",
    startDate: "2023-11-05",
    endDate: "2024-11-04",
    renewalDate: "2024-11-05",
    renewalType: "manual",
    value: "€4,200",
    paymentFrequency: "annual",
    owner: "Amanda Johnson",
    notes: "Team plan for database management"
  },
  {
    id: "24",
    app: {
      id: "24",
      name: "Tableau",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Tableau_Logo.png/1200px-Tableau_Logo.png",
      category: "Data Analytics"
    },
    vendor: "Tableau Software, LLC",
    status: "active",
    type: "subscription",
    startDate: "2023-07-15",
    endDate: "2024-07-14",
    renewalDate: "2024-07-15",
    renewalType: "auto",
    value: "€10,800",
    paymentFrequency: "annual",
    owner: "Patrick Brown",
    notes: "Creator license for data analytics"
  },
  {
    id: "25",
    app: {
      id: "25",
      name: "Box",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Box%2C_Inc._logo.svg/1200px-Box%2C_Inc._logo.svg.png",
      category: "Storage"
    },
    vendor: "Box, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-05",
    endDate: "2024-08-04",
    renewalDate: "2024-08-05",
    renewalType: "auto",
    value: "€4,680",
    paymentFrequency: "annual",
    owner: "Rachel Wilson",
    notes: "Business Plus plan for secure storage"
  },
  {
    id: "26",
    app: {
      id: "26",
      name: "Hootsuite",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Hootsuite_logo.svg/1200px-Hootsuite_logo.svg.png",
      category: "Social Media"
    },
    vendor: "Hootsuite Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-09-25",
    endDate: "2024-09-24",
    renewalDate: "2024-09-25",
    renewalType: "auto",
    value: "€4,080",
    paymentFrequency: "annual",
    owner: "Samantha Davis",
    notes: "Professional plan for social media management"
  },
  {
    id: "27",
    app: {
      id: "27",
      name: "ClickUp",
      logoUrl: "https://seeklogo.com/images/C/clickup-symbol-logo-BB24230BBB-seeklogo.com.png",
      category: "Project Management"
    },
    vendor: "ClickUp, LLC",
    status: "active",
    type: "subscription",
    startDate: "2023-10-10",
    endDate: "2024-10-09",
    renewalDate: "2024-10-10",
    renewalType: "auto",
    value: "€3,960",
    paymentFrequency: "annual",
    owner: "Ryan Thompson",
    notes: "Business plan for project management"
  },
  {
    id: "28",
    app: {
      id: "28",
      name: "Typeform",
      logoUrl: "https://seeklogo.com/images/T/typeform-logo-387E5C8740-seeklogo.com.png",
      category: "Forms"
    },
    vendor: "Typeform S.L.",
    status: "active",
    type: "subscription",
    startDate: "2023-11-20",
    endDate: "2024-11-19",
    renewalDate: "2024-11-20",
    renewalType: "manual",
    value: "€2,760",
    paymentFrequency: "annual",
    owner: "Lauren Miller",
    notes: "Business plan for form creation"
  },
  {
    id: "29",
    app: {
      id: "29",
      name: "Grammarly",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Grammarly_logo.png/1200px-Grammarly_logo.png",
      category: "Writing"
    },
    vendor: "Grammarly, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-07-25",
    endDate: "2024-07-24",
    renewalDate: "2024-07-25",
    renewalType: "auto",
    value: "€3,240",
    paymentFrequency: "annual",
    owner: "Tyler Clark",
    notes: "Business plan for writing assistance"
  },
  {
    id: "30",
    app: {
      id: "30",
      name: "Zapier",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Zapier_logo.png/1200px-Zapier_logo.png",
      category: "Automation"
    },
    vendor: "Zapier, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-15",
    endDate: "2024-08-14",
    renewalDate: "2024-08-15",
    renewalType: "auto",
    value: "€5,880",
    paymentFrequency: "annual",
    owner: "Megan Martinez",
    notes: "Team plan for automation"
  },
  {
    id: "31",
    app: {
      id: "31",
      name: "Twilio",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Twilio-logo-red.svg/1200px-Twilio-logo-red.svg.png",
      category: "Communication"
    },
    vendor: "Twilio Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-09-05",
    endDate: "2024-09-04",
    renewalDate: "2024-09-05",
    renewalType: "auto",
    value: "€6,720",
    paymentFrequency: "annual",
    owner: "Brandon Wilson",
    notes: "Communication API services"
  },
  {
    id: "32",
    app: {
      id: "32",
      name: "Webflow",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Webflow_logo.svg/1200px-Webflow_logo.svg.png",
      category: "Web Development"
    },
    vendor: "Webflow, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-10-25",
    endDate: "2024-10-24",
    renewalDate: "2024-10-25",
    renewalType: "auto",
    value: "€3,480",
    paymentFrequency: "annual",
    owner: "Emily Taylor",
    notes: "Team plan for website development"
  },
  {
    id: "33",
    app: {
      id: "33",
      name: "Shopify",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png",
      category: "E-commerce"
    },
    vendor: "Shopify Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-11-10",
    endDate: "2024-11-09",
    renewalDate: "2024-11-10",
    renewalType: "auto",
    value: "€4,320",
    paymentFrequency: "annual",
    owner: "Joshua Brown",
    notes: "Advanced plan for e-commerce"
  },
  {
    id: "34",
    app: {
      id: "34",
      name: "Datadog",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Datadog_logo.svg/1200px-Datadog_logo.svg.png",
      category: "Monitoring"
    },
    vendor: "Datadog, Inc.",
    status: "active",
    type: "subscription",
    startDate: "2023-08-30",
    endDate: "2024-08-29",
    renewalDate: "2024-08-30",
    renewalType: "auto",
    value: "€9,600",
    paymentFrequency: "annual",
    owner: "Michael Anderson",
    notes: "Pro plan for infrastructure monitoring"
  }
];
