
import { ClientsDashboard } from '@/components/dashboard/ClientsDashboard';
import Header from '@/components/layout/Header';
import React from 'react';
const ClientManage = () => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Manage Clients" />
            <div className="flex-1">
                <ClientsDashboard />
            </div>
        </div>
    );
}
export default ClientManage;