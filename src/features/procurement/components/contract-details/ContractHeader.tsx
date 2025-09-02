
import React from 'react';
import { X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Contract } from '../../types';

interface ContractHeaderProps {
  contract: Contract;
  isEditing: boolean;
  toggleEdit: () => void;
}

const ContractHeader: React.FC<ContractHeaderProps> = ({ contract, isEditing, toggleEdit }) => {
  return (
    <DialogHeader className="px-6 pt-6 pb-2 flex flex-row items-start justify-between">
      <div className="flex flex-col">
        <DialogTitle className="text-xl flex items-center gap-2">
          Contract Details
          {isEditing ? (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Editing</span>
          ) : null}
        </DialogTitle>
        <p className="text-sm text-gray-500 mt-1">
          {contract.app.name} | ID: {contract.id}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8 rounded-full"
          onClick={toggleEdit}
        >
          {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
        </Button>
        {/* Only show the close button when not editing */}
        {!isEditing && (
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        )}
      </div>
    </DialogHeader>
  );
};

export default ContractHeader;
