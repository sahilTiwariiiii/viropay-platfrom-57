
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface ApplicationDetailsSectionProps {
  editedDetails: {
    owner: string;
    category: string;
    price: string;
    lastUpdated: string;
    renewalDate: string;
  };
  isEditing: boolean;
  renewalDate: Date | undefined;
  handleEditToggle: () => void;
  handleInputChange: (field: string, value: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  setRenewalDate: (date: Date | undefined) => void;
  setEditedDetails: React.Dispatch<React.SetStateAction<{
    owner: string;
    category: string;
    price: string;
    lastUpdated: string;
    renewalDate: string;
  }>>;
}

const ApplicationDetailsSection: React.FC<ApplicationDetailsSectionProps> = ({
  editedDetails,
  isEditing,
  renewalDate,
  handleEditToggle,
  handleInputChange,
  setIsEditing,
  setRenewalDate,
  setEditedDetails
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Application Details</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEditToggle} 
            className="h-8 w-8"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-0">
          <div className="flex justify-between items-center py-4 border-b">
            <div className="text-sm text-muted-foreground">Owner</div>
            {isEditing ? (
              <Input 
                value={editedDetails.owner}
                onChange={(e) => handleInputChange('owner', e.target.value)}
                className="max-w-[200px] h-8 text-sm"
              />
            ) : (
              <div className="text-sm font-medium">{editedDetails.owner}</div>
            )}
          </div>
          
          <div className="flex justify-between items-center py-4 border-b">
            <div className="text-sm text-muted-foreground">Category</div>
            {isEditing ? (
              <Input 
                value={editedDetails.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="max-w-[200px] h-8 text-sm"
              />
            ) : (
              <div className="text-sm font-medium">{editedDetails.category}</div>
            )}
          </div>
          
          <div className="flex justify-between items-center py-4 border-b">
            <div className="text-sm text-muted-foreground">Price</div>
            {isEditing ? (
              <Input 
                value={editedDetails.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="max-w-[200px] h-8 text-sm"
              />
            ) : (
              <div className="text-sm font-medium">{editedDetails.price}</div>
            )}
          </div>
          
          <div className="flex justify-between items-center py-4 border-b">
            <div className="text-sm text-muted-foreground">Last Updated</div>
            <div className="text-sm font-medium">
              {editedDetails.lastUpdated}
            </div>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b">
            <div className="text-sm text-muted-foreground">Renewal Date</div>
            {isEditing ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-sm">
                    {editedDetails.renewalDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="single"
                    selected={renewalDate}
                    onSelect={(date) => {
                      if (date) {
                        setRenewalDate(date);
                        setEditedDetails(prev => ({
                          ...prev,
                          renewalDate: format(date, 'MMM dd, yyyy')
                        }));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <div className="text-sm font-medium">
                {editedDetails.renewalDate}
              </div>
            )}
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)} 
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleEditToggle}
            >
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationDetailsSection;
