
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Check, Clock, Globe } from 'lucide-react';

interface DiscoveryStatsCardsProps {
  totalDiscoveries: number;
  sourceStats: {
    'Google Workspace': number;
    'Microsoft': number;
    'Chrome Extension': number;
  };
}

const DiscoveryStatsCards: React.FC<DiscoveryStatsCardsProps> = ({ 
  totalDiscoveries,
  sourceStats 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Total Discoveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{totalDiscoveries}</h3>
              <p className="text-sm text-gray-600">Last searched 44 minutes ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Active Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-7 h-7 rounded flex items-center justify-center bg-red-100 text-red-600 mr-3">G</div>
                <span>Google Workspace</span>
              </div>
              <Badge variant="outline">{sourceStats['Google Workspace']}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-7 h-7 rounded flex items-center justify-center bg-blue-100 text-blue-600 mr-3">M</div>
                <span>Microsoft</span>
              </div>
              <Badge variant="outline">{sourceStats['Microsoft']}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-7 h-7 rounded flex items-center justify-center bg-green-100 text-green-600 mr-3">C</div>
                <span>Chrome Extension</span>
              </div>
              <Badge variant="outline">{sourceStats['Chrome Extension']}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Approved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">0</h3>
              <p className="text-sm text-gray-600">Applications approved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscoveryStatsCards;
