
import React from 'react';
import { Contract } from '../../types';

interface ContractNotesProps {
  contract: Contract;
  isEditing: boolean;
  handleInputChange: (field: keyof Contract, value: string) => void;
}

const ContractNotes: React.FC<ContractNotesProps> = ({
  contract,
  isEditing,
  handleInputChange
}) => {
  if (isEditing) {
    return (
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">Notes</p>
        <textarea 
          value={contract.notes || ''}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="w-full h-20 rounded-md border border-input px-3 py-2"
        />
      </div>
    );
  } 
  
  if (contract.notes) {
    return (
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">Notes</p>
        <p className="text-sm">{contract.notes}</p>
      </div>
    );
  }
  
  return null;
};

export default ContractNotes;
