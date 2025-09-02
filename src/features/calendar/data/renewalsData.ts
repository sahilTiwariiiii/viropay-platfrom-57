import { RenewalData, UpcomingRenewal } from '../types';
import { applicationsData } from '@/features/applications/data/applicationsData';
import { generateExtendedApplications } from '@/features/applications/utils/generateApplicationsData';

// Get the next upcoming renewal
export const getNextUpcomingRenewal = () => {
  const currentDate = new Date();
  const futureRenewals = monthsData.flatMap(month => 
    month.renewals.filter(renewal => {
      const renewalDate = new Date(renewal.date);
      return renewalDate > currentDate;
    })
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (futureRenewals.length > 0) {
    const firstRenewal = futureRenewals[0];
    const renewalDate = new Date(firstRenewal.date);
    const daysLeft = Math.ceil((renewalDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      ...firstRenewal,
      daysLeft
    } as UpcomingRenewal;
  }
  
  return null;
};

// Get the current month name
export const getCurrentMonthName = () => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[new Date().getMonth()];
};

// Function to generate random date for a specific month and year
const generateRandomDate = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Function to convert application to renewal object
const convertApplicationToRenewal = (application, month, year) => {
  const baseAmount = application.cost || Math.floor(Math.random() * 2000) + 1000;
  
  const randomFrequency = Math.random();
  let billingFrequency: 'Annual' | 'Monthly' | 'Quarterly';
  
  if (randomFrequency > 0.7) {
    billingFrequency = 'Annual';
  } else if (randomFrequency > 0.5) {
    billingFrequency = 'Monthly';
  } else {
    billingFrequency = 'Quarterly';
  }
  
  return {
    id: application.id,
    name: application.name,
    logoUrl: application.logoUrl,
    logo: application.logo,
    date: generateRandomDate(month, year),
    amount: `€${baseAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    billingFrequency,
    usage: Math.floor(Math.random() * 30) + 70,
    unassigned: Math.floor(Math.random() * 3)
  };
};

// Generate the months data with all active applications, ensuring each app appears only once across ALL months
export const monthsData: RenewalData[] = (() => {
  const allApps = generateExtendedApplications();
  const activeApps = allApps.filter(app => app.status === 'active');
  
  console.log(`Total active applications: ${activeApps.length}`);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthlyRenewals = months.map(month => ({ month, renewals: [], amount: 0 }));
  
  const assignedApps = new Set();
  
  const appIdToMonthMap = new Map();
  
  const shuffledApps = [...activeApps].sort(() => Math.random() - 0.5);
  
  shuffledApps.forEach(app => {
    if (assignedApps.has(app.id)) {
      return;
    }
    
    let targetMonth: number;
    
    if (app.nextPayment) {
      try {
        const paymentDate = new Date(app.nextPayment);
        targetMonth = paymentDate.getMonth();
      } catch (e) {
        targetMonth = Math.floor(Math.random() * 12);
      }
    } else {
      targetMonth = Math.floor(Math.random() * 12);
    }
    
    if (targetMonth < 0 || targetMonth > 11 || isNaN(targetMonth)) {
      targetMonth = Math.floor(Math.random() * 12);
    }
    
    const renewal = convertApplicationToRenewal(app, targetMonth, 2025);
    
    if (monthlyRenewals[targetMonth]) {
      if (!monthlyRenewals[targetMonth].renewals.some(r => r.id === app.id)) {
        monthlyRenewals[targetMonth].renewals.push(renewal);
        assignedApps.add(app.id);
      }
    } else {
      console.error(`Month index ${targetMonth} is out of bounds`);
    }
  });
  
  monthlyRenewals.forEach(monthData => {
    if (monthData && monthData.renewals) {
      const totalAmount = monthData.renewals.reduce((sum, renewal) => {
        const amount = parseFloat(renewal.amount.replace('€', '').replace('.', '').replace(',', '.').trim());
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      
      monthData.amount = totalAmount;
    }
  });
  
  const finalCheck = new Set();
  let duplicatesFound = false;
  
  monthlyRenewals.forEach(month => {
    month.renewals.forEach(renewal => {
      if (finalCheck.has(renewal.id)) {
        console.error(`Duplicate application found: ${renewal.name} with ID ${renewal.id}`);
        duplicatesFound = true;
      } else {
        finalCheck.add(renewal.id);
      }
    });
  });
  
  if (duplicatesFound) {
    console.warn('Duplicates found in calendar data. This should not happen.');
  } else {
    console.log('Calendar validation passed: No duplicate applications found across months.');
  }
  
  return monthlyRenewals;
})();
