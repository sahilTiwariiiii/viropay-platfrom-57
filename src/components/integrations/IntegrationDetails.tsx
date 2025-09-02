
import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 mt-1">
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    </div>
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
    </div>
  </div>
);

export interface IntegrationDetailsProps {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string | React.ReactNode;
  enabled: boolean;
  features: FeatureItemProps[];
  open: boolean;
  onClose: () => void;
  onToggle: (id: string, enabled: boolean) => void;
}

const IntegrationDetails: React.FC<IntegrationDetailsProps> = ({
  id,
  name,
  description,
  longDescription,
  icon,
  enabled,
  features,
  open,
  onClose,
  onToggle
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[85vh]">
        <DialogHeader className="flex flex-row items-start gap-4 sm:gap-6">
          {typeof icon === 'string' ? (
            <ApplicationLogo 
              name={name}
              logoUrl={icon}
              size="lg"
              className="bg-slate-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-slate-100 flex-shrink-0 overflow-hidden">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-display">{name}</DialogTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {enabled ? 'Enabled' : 'Disabled'}
                </span>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => onToggle(id, checked)}
                />
              </div>
            </div>
            <DialogDescription className="mt-2">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-sm leading-relaxed">
              {longDescription}
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-slate-50 border">
            <h3 className="font-medium mb-4">Key Features</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Authentication</h3>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Connect your account</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You'll be redirected to {name} to authorize access
                  </p>
                </div>
                <Button size="sm">
                  {enabled ? 'Reconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Data Permissions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Read user data</p>
                </div>
                <Badge>Required</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Read application data</p>
                </div>
                <Badge>Required</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Write application data</p>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6 flex items-center justify-between sm:justify-between gap-2">
          <Button variant="outline" className="gap-2" onClick={onClose}>
            <X className="w-4 h-4" /> Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">View Documentation</Button>
            <Button>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationDetails;
