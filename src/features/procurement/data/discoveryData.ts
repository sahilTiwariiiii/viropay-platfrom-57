
import { Discovery } from '../types';

// Generate 96 realistic discoveries
const generateDiscoveries = (): Discovery[] => {
  const apps = [
    { name: 'TradingView', logo: 'T', logoUrl: 'https://static.tradingview.com/static/images/logo-preview.png' },
    { name: 'Docusign', logo: 'D', logoUrl: 'https://cdn.worldvectorlogo.com/logos/docusign.svg' },
    { name: 'Microsoft 365', logo: 'M', logoUrl: 'https://www.microsoft.com/favicon.ico' },
    { name: 'Proxy-Seller', logo: 'P', logoUrl: 'https://proxy-seller.com/img/favicon.svg' },
    { name: 'Keyplay', logo: 'K', logoUrl: 'https://keyplay.io/assets/img/logo.svg' },
    { name: 'Statuspage', logo: 'S', logoUrl: 'https://cdn.statuspage.io/static/opo/img/favicon.ico' },
    { name: 'Monday.com', logo: 'MD', logoUrl: 'https://monday.com/favicon.ico' },
    { name: 'HubSpot', logo: 'HS', logoUrl: 'https://www.hubspot.com/hubfs/assets/hubspot.com/favicon.ico' },
    { name: 'Salesforce', logo: 'SF', logoUrl: 'https://www.salesforce.com/favicon.ico' },
    { name: 'Notion', logo: 'NT', logoUrl: 'https://www.notion.so/front-static/favicon.ico' },
    { name: 'Slack', logo: 'SL', logoUrl: 'https://a.slack-edge.com/cebaa/img/ico/favicon.ico' },
    { name: 'Zoom', logo: 'ZM', logoUrl: 'https://st1.zoom.us/zoom.ico' },
    { name: 'Asana', logo: 'AS', logoUrl: 'https://asana.com/favicon.ico' },
    { name: 'Trello', logo: 'TR', logoUrl: 'https://trello.com/favicon.ico' },
    { name: 'Dropbox', logo: 'DB', logoUrl: 'https://www.dropbox.com/static/favicon.ico' },
    { name: 'Box', logo: 'BX', logoUrl: 'https://www.box.com/themes/custom/box/favicon.ico' },
    { name: 'GitHub', logo: 'GH', logoUrl: 'https://github.githubassets.com/favicons/favicon.svg' },
    { name: 'GitLab', logo: 'GL', logoUrl: 'https://about.gitlab.com/ico/favicon.ico' },
    { name: 'Bitbucket', logo: 'BB', logoUrl: 'https://bitbucket.org/favicon.ico' },
    { name: 'Jira', logo: 'JI', logoUrl: 'https://jira.atlassian.com/favicon.ico' },
    { name: 'Confluence', logo: 'CF', logoUrl: 'https://confluence.atlassian.com/favicon.ico' },
    { name: 'Zendesk', logo: 'ZD', logoUrl: 'https://www.zendesk.com/favicon.ico' },
    { name: 'Intercom', logo: 'IC', logoUrl: 'https://static.intercomassets.com/assets/favicon-32x32-e0a509671421f8e65d4c6d7748434e0c.png' },
    { name: 'Twilio', logo: 'TW', logoUrl: 'https://www.twilio.com/assets/favicon/favicon.ico' },
    { name: 'Segment', logo: 'SG', logoUrl: 'https://segment.com/favicon.ico' },
    { name: 'Stripe', logo: 'ST', logoUrl: 'https://stripe.com/favicon.ico' },
    { name: 'AWS', logo: 'AW', logoUrl: 'https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico' },
    { name: 'Google Cloud', logo: 'GC', logoUrl: 'https://www.gstatic.com/devrel-devsite/prod/v84e6f6a61298bbae5bb110" ' },
    { name: 'Azure', logo: 'AZ', logoUrl: 'https://azure.microsoft.com/favicon.ico' },
    { name: 'Atlassian', logo: 'AT', logoUrl: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png' },
    { name: 'Adobe Creative Cloud', logo: 'AC', logoUrl: 'https://www.adobe.com/favicon.ico' },
    { name: 'Canva', logo: 'CA', logoUrl: 'https://static.canva.com/static/images/favicon-1.ico' },
    { name: 'Figma', logo: 'FG', logoUrl: 'https://static.figma.com/app/icon/1/favicon.png' },
    { name: 'Sketch', logo: 'SK', logoUrl: 'https://www.sketch.com/images/components/icons/favicon@2x.png' },
    { name: 'InVision', logo: 'IV', logoUrl: 'https://www.invisionapp.com/favicon.ico' },
    { name: 'Miro', logo: 'MI', logoUrl: 'https://miro.com/static/favicons/favicon.ico' },
    { name: 'Airtable', logo: 'AI', logoUrl: 'https://airtable.com/favicon.ico' },
    { name: 'QuickBooks', logo: 'QB', logoUrl: 'https://quickbooks.intuit.com/favicon.ico' },
    { name: 'Xero', logo: 'XE', logoUrl: 'https://www.xero.com/content/dam/xero/pilot-images/brand/icons/favicon.ico' },
    { name: 'Shopify', logo: 'SH', logoUrl: 'https://cdn.shopify.com/static/shopify-favicon.png' },
    { name: 'Mailchimp', logo: 'MC', logoUrl: 'https://mailchimp.com/release/plums/cxp/images/favicon.svg' },
    { name: 'SendGrid', logo: 'SG', logoUrl: 'https://sendgrid.com/favicon.ico' },
    { name: 'Hootsuite', logo: 'HO', logoUrl: 'https://hootsuite.com/favicon.ico' },
    { name: 'Buffer', logo: 'BU', logoUrl: 'https://buffer.com/favicon.ico' },
    { name: 'Google Analytics', logo: 'GA', logoUrl: 'https://www.google.com/analytics/favicon.ico' },
    { name: 'Hotjar', logo: 'HJ', logoUrl: 'https://www.hotjar.com/favicon.ico' }
  ];

  const domains = ['viropay.com', 'finance.viropay.com', 'dev.viropay.com', 'tech.viropay.com', 'marketing.viropay.com'];
  const names = ['alex', 'sarah', 'michael', 'emma', 'david', 'olivia', 'james', 'sophia', 'robert', 'ava', 'joseph', 'noah', 'emily', 'thomas', 'jessica'];
  const sources = ['Google Workspace', 'Microsoft', 'Chrome Extension'];
  const timeframes = [
    '2 minutes ago', '5 minutes ago', '10 minutes ago', '15 minutes ago', '21 minutes ago', 
    '30 minutes ago', '38 minutes ago', '45 minutes ago', '53 minutes ago', '1 hour ago', 
    '2 hours ago', '3 hours ago', '4 hours ago', '5 hours ago', 'yesterday', 
    '2 days ago', '3 days ago', 'last week'
  ];

  const discoveries: Discovery[] = [];

  // Create variations of each app to reach 96 discoveries
  for (let i = 0; i < 96; i++) {
    const appIndex = i % apps.length;
    const app = apps[appIndex];
    
    // Generate between 20 and 150 users
    const numUsers = Math.floor(Math.random() * (130)) + 20;
    const users = [];
    
    // Create user list
    for (let j = 0; j < numUsers; j++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const email = `${name}${Math.random().toString().substring(2, 5)}@${domain}`;
      const count = Math.floor(Math.random() * 5) + 1;
      users.push({ email, count });
    }
    
    // Random number of sources (1-3)
    const numSources = Math.floor(Math.random() * 3) + 1;
    const sourceIcons = [];
    for (let k = 0; k < numSources; k++) {
      const source = sources[k];
      if (!sourceIcons.includes(source)) {
        sourceIcons.push(source);
      }
    }
    
    const lastUsed = timeframes[Math.floor(Math.random() * timeframes.length)];
    
    discoveries.push({
      id: (i + 1).toString(),
      name: app.name,
      logo: app.logo,
      logoUrl: app.logoUrl,
      users,
      source: sourceIcons[0], // Primary source
      lastUsed,
      sourceIcons
    });
  }
  
  return discoveries;
};

export const discoveryData = generateDiscoveries();
