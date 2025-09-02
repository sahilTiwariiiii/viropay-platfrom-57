
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ContractDocumentsProps {
  uploadedFile: string | null;
}

const ContractDocuments: React.FC<ContractDocumentsProps> = ({
  uploadedFile
}) => {
  if (!uploadedFile) return null;
  
  return (
    <div className="mb-6 p-3 bg-gray-50 rounded-md border border-gray-200">
      <div className="flex items-center">
        <FileText className="h-5 w-5 text-blue-500 mr-2" />
        <span className="font-medium text-sm">{uploadedFile}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto"
          onClick={() => {
            toast({
              title: "Contract Downloaded",
              description: `${uploadedFile} has been downloaded.`,
            });
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default ContractDocuments;
