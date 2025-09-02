
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface BulkUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedFile {
  name: string;
  size: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

// Sample dummy file names
const dummyFileNames = [
  'Slack_Enterprise_Contract_2024.pdf',
  'Microsoft365_License_Agreement.pdf',
  'AWS_Service_Contract_Q2.pdf',
  'Zoom_Enterprise_License.pdf',
  'Salesforce_CRM_Agreement.pdf',
  'Adobe_Creative_Cloud_License.pdf',
  'GoogleWorkspace_Contract.pdf',
  'Asana_Enterprise_Agreement.pdf',
  'Dropbox_Business_Contract.pdf'
];

const BulkUploadDialog: React.FC<BulkUploadDialogProps> = ({ isOpen, onOpenChange }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Add some sample files when dialog opens
  useEffect(() => {
    if (isOpen && files.length === 0) {
      // Add 2 sample files that are already uploaded
      const sampleFiles: UploadedFile[] = [
        {
          name: dummyFileNames[0],
          size: '245.2 KB',
          status: 'success',
          progress: 100
        },
        {
          name: dummyFileNames[1],
          size: '320.8 KB',
          status: 'success',
          progress: 100
        }
      ];
      setFiles(sampleFiles);
    }
  }, [isOpen, files.length]);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const processFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      status: 'uploading',
      progress: 0
    }));
    
    setFiles([...files, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach((_, index) => {
      const totalIndex = files.length + index;
      
      const interval = setInterval(() => {
        setFiles(current => 
          current.map((file, i) => {
            if (i === totalIndex) {
              const newProgress = file.progress + 10;
              
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...file, progress: 100, status: 'success' };
              }
              
              return { ...file, progress: newProgress };
            }
            return file;
          })
        );
      }, 300);
    });
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      processFiles(e.target.files);
      e.target.value = '';
    } else {
      // Simulate file upload with dummy files when no real files are selected
      const randomIndex = Math.floor(Math.random() * dummyFileNames.length);
      const dummyFileName = dummyFileNames[randomIndex];
      const dummySize = (Math.random() * 500 + 100).toFixed(1) + ' KB';
      
      const dummyFile: UploadedFile = {
        name: dummyFileName,
        size: dummySize,
        status: 'uploading',
        progress: 0
      };
      
      setFiles([...files, dummyFile]);
      
      // Simulate upload progress
      const newIndex = files.length;
      const interval = setInterval(() => {
        setFiles(current => 
          current.map((file, i) => {
            if (i === newIndex) {
              const newProgress = file.progress + 10;
              
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...file, progress: 100, status: 'success' };
              }
              
              return { ...file, progress: newProgress };
            }
            return file;
          })
        );
      }, 300);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleUploadComplete = () => {
    const successCount = files.filter(f => f.status === 'success').length;
    
    toast({
      title: `Upload Complete`,
      description: `Successfully uploaded ${successCount} contract${successCount !== 1 ? 's' : ''}.`,
    });
    
    onOpenChange(false);
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Contracts</DialogTitle>
          <DialogDescription>
            Upload contract documents in PDF, DOC, or DOCX format.
          </DialogDescription>
        </DialogHeader>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mt-4 ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Drag and drop contracts here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label htmlFor="bulk-contract-upload" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
            Browse Files
            <input 
              id="bulk-contract-upload" 
              type="file" 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              multiple
            />
          </label>
          <p className="text-xs text-gray-400 mt-4">Supports PDF, DOC, DOCX up to 10MB</p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Uploaded Files</h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {file.status === 'uploading' ? (
                      <div className="w-20">
                        <Progress value={file.progress} className="h-1.5" />
                      </div>
                    ) : file.status === 'success' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleUploadComplete}
            disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
          >
            Complete Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadDialog;
