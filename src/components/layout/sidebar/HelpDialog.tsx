
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Help & Support</DialogTitle>
          <DialogDescription>
            Get help with your Viropay applications and services.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Need assistance?</h3>
            <p className="text-sm text-muted-foreground">
              Join our Slack channel for quick support from our team and community.
            </p>
            <Button 
              className="mt-2 flex items-center gap-2" 
              onClick={() => {
                toast({
                  title: "Slack Link Copied",
                  description: "Slack invitation link copied to clipboard"
                });
                navigator.clipboard.writeText('https://join.slack.com/t/viropay-community/shared_invite/zt-example');
              }}
            >
              Join our Slack channel
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Contact support</h3>
            <p className="text-sm text-muted-foreground">
              For urgent matters, please contact our support team directly.
            </p>
            <a href="mailto:support@viropay.com" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
              support@viropay.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
