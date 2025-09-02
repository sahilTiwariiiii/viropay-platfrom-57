
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, ExternalLink, Clock, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { UpcomingRenewal as UpcomingRenewalType } from '../types';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UpcomingRenewalProps {
  renewal: UpcomingRenewalType;
}

const UpcomingRenewal: React.FC<UpcomingRenewalProps> = ({ renewal }) => {
  // Calculate urgency based on days left
  const getUrgencyIndicator = () => {
    if (renewal.daysLeft <= 7) return {
      color: "bg-red-50 border-red-100",
      textColor: "text-red-700",
      badgeColor: "bg-red-100 text-red-800",
      progressColor: "bg-red-500"
    };
    
    if (renewal.daysLeft <= 30) return {
      color: "bg-orange-50 border-orange-100",
      textColor: "text-orange-700", 
      badgeColor: "bg-orange-100 text-orange-800",
      progressColor: "bg-orange-500"
    };
    
    return {
      color: "bg-blue-50 border-blue-100",
      textColor: "text-blue-700",
      badgeColor: "bg-blue-100 text-blue-800",
      progressColor: "bg-blue-500"
    };
  };
  
  const urgency = getUrgencyIndicator();
  
  // Calculate progress (inverted - less days means more progress)
  const progressValue = renewal.daysLeft <= 60 
    ? 100 - (renewal.daysLeft / 60 * 100)
    : 0;
  
  return (
    <Card className={`${urgency.color} border-${urgency.color} mb-6`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <Link to={`/demo/application/${renewal.id}`} className="flex items-start group">
              <ApplicationLogo 
                name={renewal.name}
                logoUrl={renewal.logoUrl}
                logo={renewal.logo}
                size="md"
                className="mt-1"
              />
              <div className="ml-4">
                <div className="flex items-center">
                  <h3 className={`font-medium group-hover:${urgency.textColor} transition-colors text-lg`}>
                    {renewal.name}
                  </h3>
                  {renewal.daysLeft <= 7 && (
                    <AlertTriangle className="h-4 w-4 text-red-500 ml-1.5" />
                  )}
                </div>
                
                <div className="text-sm text-gray-600 flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {renewal.date}
                  <Badge className={`ml-2 ${urgency.badgeColor}`}>
                    in {renewal.daysLeft} days
                  </Badge>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  <span className="mr-4">Usage: {renewal.usage}%</span>
                  
                  {renewal.unassigned > 0 && (
                    <span className="text-yellow-700">
                      {renewal.unassigned} unassigned
                    </span>
                  )}
                </div>
                
                <div className="mt-3 w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Renewal approaching</span>
                    <span>{renewal.daysLeft} days left</span>
                  </div>
                  <Progress value={progressValue} className="h-1.5" indicatorClassName={urgency.progressColor} />
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="text-right mr-4">
              <div className="text-sm text-gray-500">Amount</div>
              <div className={`font-medium text-lg ${urgency.textColor}`}>{renewal.amount}</div>
              <div className="text-sm text-gray-600">{renewal.billingFrequency}</div>
            </div>
            <Link to={`/demo/application/${renewal.id}`}>
              <Button variant="outline" size="sm" className="h-8">
                <ExternalLink className="h-4 w-4 mr-1" />
                View details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingRenewal;
