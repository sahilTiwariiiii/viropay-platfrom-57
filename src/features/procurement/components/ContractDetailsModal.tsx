
import React from 'react';
import { Contract } from '../types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ContractHeader from './contract-details/ContractHeader';
import ContractAppInfo from './contract-details/ContractAppInfo';
import ContractDetailsForm from './contract-details/ContractDetailsForm';
import ContractNotes from './contract-details/ContractNotes';
import ContractDocuments from './contract-details/ContractDocuments';
import ContractActions from './contract-details/ContractActions';
import { useContractEdit } from './contract-details/useContractEdit';

interface ContractDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract | null;
}

const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({
  isOpen,
  onClose,
  contract
}) => {
  const {
    isEditing,
    editedContract,
    uploadedFile,
    handleInputChange,
    handleAppInputChange,
    handleUploadContract,
    handleSaveChanges,
    toggleEdit
  } = useContractEdit(contract, onClose);

  if (!contract || !editedContract) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <ContractHeader 
          contract={editedContract}
          isEditing={isEditing}
          toggleEdit={toggleEdit}
        />
        
        <div className="p-6 pt-2">
          <ContractAppInfo 
            contract={editedContract}
            isEditing={isEditing}
            handleAppInputChange={handleAppInputChange}
          />
          
          <ContractDetailsForm 
            contract={editedContract}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
          
          <ContractNotes 
            contract={editedContract}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
          
          <ContractDocuments uploadedFile={uploadedFile} />
          
          <ContractActions 
            isEditing={isEditing}
            uploadedFile={uploadedFile}
            handleSaveChanges={handleSaveChanges}
            handleUploadContract={handleUploadContract}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetailsModal;
