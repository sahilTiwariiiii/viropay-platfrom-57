
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompanyInformation from '@/features/settings/components/CompanyInformation';
import UserManagement from '@/features/settings/components/UserManagement';
import SubscriptionTab from '@/features/settings/components/SubscriptionTab';
import ViropayExtensionTab from '@/features/settings/components/ViropayExtensionTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("company");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real application, this would handle logout logic
    // For now, just redirect to the login page
    navigate('/');
    
    // Show a toast notification that the user has been logged out
    // This would typically use your toast system
    console.log('User logged out');
  };
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header title="Settings" subtitle="Manage your organization settings" />
      
      <main className="flex-1 overflow-y-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="company" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm py-[6px]">
              Company Information
            </TabsTrigger>
            <TabsTrigger value="users" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm py-[6px]">
              User Management
            </TabsTrigger>
            <TabsTrigger value="subscription" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm py-[6px]">
              Subscription
            </TabsTrigger>
            <TabsTrigger value="viropay" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm py-[6px]">
              Viropay Extension
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="mt-0">
            <CompanyInformation />
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="subscription" className="mt-0">
            <SubscriptionTab />
          </TabsContent>
          
          <TabsContent value="viropay" className="mt-0">
            <ViropayExtensionTab />
          </TabsContent>
        </Tabs>
        
        {/* Logout section */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Account</h2>
              <p className="text-gray-500">Manage your account settings</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleLogout} 
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
