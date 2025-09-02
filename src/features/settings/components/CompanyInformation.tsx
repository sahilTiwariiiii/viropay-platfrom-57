
import React from 'react';
import { Input } from '@/components/ui/input';
import { CompanyInfo } from '../types';
import { Camera } from 'lucide-react';

const CompanyInformation = () => {
  const [companyInfo, setCompanyInfo] = React.useState<CompanyInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@virocards.com',
    companyName: 'ViroCards B.V. (prod)',
    companyType: 'BV',
    industry: 'Information and Communication',
    employeeCount: '3',
    annualRevenue: 'Less than €1 million'
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Company Information</h2>
          <p className="text-gray-500">View and manage your company details</p>
        </div>
        <div className="relative">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            VI
          </div>
          <button className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1.5">
            <Camera className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <Input 
              value={companyInfo.firstName} 
              onChange={(e) => setCompanyInfo({...companyInfo, firstName: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Company Type</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
            </div>
            <Input 
              value={companyInfo.companyType} 
              onChange={(e) => setCompanyInfo({...companyInfo, companyType: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <Input 
              value={companyInfo.lastName} 
              onChange={(e) => setCompanyInfo({...companyInfo, lastName: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Industry</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            </div>
            <Input 
              value={companyInfo.industry} 
              onChange={(e) => setCompanyInfo({...companyInfo, industry: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <Input 
              value={companyInfo.email} 
              onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Number of employees</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <Input 
              value={companyInfo.employeeCount} 
              onChange={(e) => setCompanyInfo({...companyInfo, employeeCount: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
            </div>
            <Input 
              value={companyInfo.companyName} 
              onChange={(e) => setCompanyInfo({...companyInfo, companyName: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Annual Revenue</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-euro"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>
            </div>
            <Input 
              value={companyInfo.annualRevenue} 
              onChange={(e) => setCompanyInfo({...companyInfo, annualRevenue: e.target.value})}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
