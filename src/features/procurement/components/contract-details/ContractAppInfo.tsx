
import React from 'react';
import { Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { Contract } from '../../types';

interface ContractAppInfoProps {
  contract: Contract;
  isEditing: boolean;
  handleAppInputChange: (field: keyof Contract['app'], value: string) => void;
}

const ContractAppInfo: React.FC<ContractAppInfoProps> = ({ 
  contract, 
  isEditing, 
  handleAppInputChange 
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <ApplicationLogo 
        name={contract.app.name} 
        logoUrl={contract.app.logoUrl}
        size="md"
      />
      <div>
        {isEditing ? (
          <Input 
            value={contract.app.name}
            onChange={(e) => handleAppInputChange('name', e.target.value)}
            className="font-medium text-lg h-8"
          />
        ) : (
          <h3 className="font-medium text-lg">{contract.app.name}</h3>
        )}
        {isEditing ? (
          <Input 
            value={contract.app.category}
            onChange={(e) => handleAppInputChange('category', e.target.value)}
            className="text-sm text-gray-500 h-6 mt-1"
          />
        ) : (
          <p className="text-sm text-gray-500">{contract.app.category}</p>
        )}
      </div>
      {contract.isFavorite && (
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 ml-auto" />
      )}
    </div>
  );
};

export default ContractAppInfo;
