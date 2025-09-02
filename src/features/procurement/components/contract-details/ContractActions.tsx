
import React from 'react';
import { Upload, ExternalLink, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ContractActionsProps {
  isEditing: boolean;
  uploadedFile: string | null;
  handleSaveChanges: () => void;
  handleUploadContract: () => void;
}

const ContractActions: React.FC<ContractActionsProps> = ({
  isEditing,
  uploadedFile,
  handleSaveChanges,
  handleUploadContract
}) => {
  return (
    <div className="border-t pt-6 flex justify-between items-center">
      {isEditing ? (
        <Button 
          variant="default" 
          className="flex items-center gap-2"
          onClick={handleSaveChanges}
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      ) : (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleUploadContract}
        >
          <Upload className="h-4 w-4" />
          {uploadedFile ? 'Replace Contract' : 'Upload Contract'}
        </Button>
      )}
      
      {!isEditing && (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            if (uploadedFile) {
              toast({
                title: "Contract Downloaded",
                description: `${uploadedFile} has been downloaded.`,
              });
            } else {
              toast({
                description: "No contract document available.",
                variant: "destructive"
              });
            }
          }}
        >
          <ExternalLink className="h-4 w-4" />
          View Contract
        </Button>
      )}
    </div>
  );
};

export default ContractActions;
