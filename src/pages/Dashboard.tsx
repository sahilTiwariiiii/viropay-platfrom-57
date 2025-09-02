
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const notifyFeature = () => {
    toast.success("We'll notify you when this feature is available!");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Dashboard"
        subtitle="Your SaaS insights center"
        showBackButton={false}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="bg-white shadow-sm w-full max-w-5xl mx-auto mt-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100 rounded-full -ml-24 -mb-24 opacity-50"></div>
          
          <div className="relative p-10 md:p-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
              Dashboard Coming Soon
            </h1>
            
            <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg md:text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We're building a powerful dashboard to help you track and optimize your SaaS spending.
              Stay tuned for comprehensive analytics and insights.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={notifyFeature} 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 hover-scale"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Me When Ready
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/demo/applications')} 
                className="hover-scale"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Your Applications
              </Button>
            </div>
            
            <div className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <FeatureCard 
                title="Spend Analytics" 
                description="Track and monitor your SaaS spending across all applications."
              />
              <FeatureCard 
                title="Usage Insights" 
                description="Understand how your team uses different software solutions."
              />
              <FeatureCard 
                title="Renewal Management" 
                description="Never miss a renewal date with smart calendar integration."
              />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-gray-50 rounded-lg p-6 text-left hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Dashboard;
