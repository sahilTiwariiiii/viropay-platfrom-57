
import { useState, useEffect } from 'react';
import { Contract } from '../../types';
import { toast } from '@/hooks/use-toast';

export const useContractEdit = (
  contract: Contract | null,
  onClose: () => void
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContract, setEditedContract] = useState<Contract | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  // Initialize edited contract when contract changes
  useEffect(() => {
    if (contract) {
      setEditedContract({ ...contract });
      // Simulate having a contract file for some contracts
      if (contract.id === '1' || contract.id === '3' || contract.id === '5') {
        setUploadedFile(`${contract.app.name}_Contract_${contract.id}.pdf`);
      } else {
        setUploadedFile(null);
      }
    }
  }, [contract]);

  const handleInputChange = (field: keyof Contract, value: string) => {
    if (editedContract) {
      if (field === 'users' && editedContract.users) {
        setEditedContract({
          ...editedContract,
          users: JSON.parse(value)
        });
      } else {
        setEditedContract({
          ...editedContract,
          [field]: value
        });
      }
    }
  };

  const handleAppInputChange = (field: keyof Contract['app'], value: string) => {
    if (editedContract) {
      setEditedContract({
        ...editedContract,
        app: {
          ...editedContract.app,
          [field]: value
        }
      });
    }
  };
  
  const handleUploadContract = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setUploadedFile(file.name);
        // Simulate uploading
        toast({
          title: "Contract Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      }
    };
    
    input.click();
  };

  const handleSaveChanges = () => {
    // Save changes (in a real app, this would update the backend)
    toast({
      title: "Changes Saved",
      description: "Contract details have been updated successfully.",
    });
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Discard changes
      if (contract) {
        setEditedContract({ ...contract });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return {
    isEditing,
    editedContract,
    uploadedFile,
    handleInputChange,
    handleAppInputChange,
    handleUploadContract,
    handleSaveChanges,
    toggleEdit
  };
};
