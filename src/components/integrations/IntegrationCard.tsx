
import React from 'react';
import { ExternalLink, Info, Package, Coffee, Mail, FileText, Shield, CreditCard } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export interface IntegrationProps {
  id: string;
  name: string;
  description: string;
  icon: string | React.ReactNode;
  enabled: boolean;
  onToggle: (id: string, enabled: boolean) => void;
  onClick: (id: string) => void;
  comingSoon?: boolean;
}

const IntegrationCard: React.FC<IntegrationProps> = ({
  id,
  name,
  description,
  icon,
  enabled,
  onToggle,
  onClick,
  comingSoon = false
}) => {
  return (
    <div
      className={cn(
        "relative p-6 border rounded-lg bg-white transition-all",
        "hover:shadow-md group cursor-pointer"
      )}
      onClick={() => !comingSoon && onClick(id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {typeof icon === 'string' ? (
            <ApplicationLogo 
              name={name}
              logoUrl={icon}
              size="sm"
              className="bg-slate-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-slate-100">
              {icon || <Package className="w-5 h-5 text-gray-500" />}
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{name}</h3>
              {comingSoon && (
                <Badge variant="outline" className="ml-2 text-xs bg-slate-100">
                  Coming Soon
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>
          </div>
        </div>
        
        {!comingSoon && (
          <Switch
            checked={enabled}
            onCheckedChange={(checked) => {
              onToggle(id, checked);
              // Prevent the card click when clicking on the switch
              event?.stopPropagation();
            }}
          />
        )}
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              <Info className="w-4 h-4 text-slate-600" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent align="end" className="w-64">
            <div className="space-y-2">
              <p className="text-sm font-medium">Quick Info</p>
              <p className="text-xs text-muted-foreground">{description}</p>
              <div className="flex justify-end">
                <button className="text-xs text-blue-500 flex items-center gap-1">
                  Learn more <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default IntegrationCard;
