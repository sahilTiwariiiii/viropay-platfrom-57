
import React from 'react';
import { Contract } from '../../types';
import ContractFormField from './ContractFormField';
import { Input } from '@/components/ui/input';

interface ContractDetailsFormProps {
  contract: Contract;
  isEditing: boolean;
  handleInputChange: (field: keyof Contract, value: string) => void;
}

const ContractDetailsForm: React.FC<ContractDetailsFormProps> = ({
  contract,
  isEditing,
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
      <ContractFormField 
        label="Vendor"
        isEditing={isEditing}
        value={contract.vendor || '-'}
        onChange={(value) => handleInputChange('vendor', value)}
      />
      
      <ContractFormField 
        label="Status"
        isEditing={isEditing}
        value={contract.status}
        render={() => (
          isEditing ? (
            <select 
              value={contract.status}
              onChange={(e) => handleInputChange('status', e.target.value as any)}
              className="w-full h-8 rounded-md border border-input px-3"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          ) : (
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              contract.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {contract.status === 'active' ? 'Active' : 'Expired'}
            </div>
          )
        )}
      />
      
      <ContractFormField 
        label="Start Date"
        isEditing={isEditing}
        value={contract.startDate}
        type="date"
        onChange={(value) => handleInputChange('startDate', value)}
      />
      
      <ContractFormField 
        label="End Date"
        isEditing={isEditing}
        value={contract.endDate}
        type="date"
        onChange={(value) => handleInputChange('endDate', value)}
      />
      
      <ContractFormField 
        label="Renewal Date"
        isEditing={isEditing}
        value={contract.renewalDate}
        type="date"
        onChange={(value) => handleInputChange('renewalDate', value)}
      />
      
      <ContractFormField 
        label="Renewal Type"
        isEditing={isEditing}
        value={contract.renewalType}
        render={() => (
          isEditing ? (
            <select 
              value={contract.renewalType}
              onChange={(e) => handleInputChange('renewalType', e.target.value as any)}
              className="w-full h-8 rounded-md border border-input px-3"
            >
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
            </select>
          ) : (
            <p className="font-medium capitalize">{contract.renewalType}</p>
          )
        )}
      />
      
      <ContractFormField 
        label="Annual Cost"
        isEditing={isEditing}
        value={contract.value}
        onChange={(value) => handleInputChange('value', value)}
      />
      
      <ContractFormField 
        label="Monthly Cost"
        isEditing={isEditing}
        value={contract.monthlyCost || '-'}
      />
      
      <ContractFormField 
        label="Payment Frequency"
        isEditing={isEditing}
        value={contract.paymentFrequency || '-'}
        onChange={(value) => handleInputChange('paymentFrequency', value)}
      />
      
      <ContractFormField 
        label="Contract Term"
        isEditing={isEditing}
        value={contract.term || '-'}
        onChange={(value) => handleInputChange('term', value)}
      />
      
      <ContractFormField 
        label="Total Users"
        isEditing={isEditing}
        value={contract.users?.total.toString() || '-'}
        type="number"
        render={() => (
          isEditing && contract.users ? (
            <Input 
              type="number"
              value={contract.users.total}
              onChange={(e) => {
                handleInputChange('users', JSON.stringify({
                  ...contract.users,
                  total: parseInt(e.target.value) || 0
                }));
              }}
              className="font-medium h-8"
            />
          ) : (
            <p className="font-medium">{contract.users?.total.toString() || '-'}</p>
          )
        )}
      />
      
      <ContractFormField 
        label="Active Users"
        isEditing={isEditing}
        value={contract.users?.active.toString() || '-'}
        type="number"
        render={() => (
          isEditing && contract.users ? (
            <Input 
              type="number"
              value={contract.users.active}
              onChange={(e) => {
                handleInputChange('users', JSON.stringify({
                  ...contract.users,
                  active: parseInt(e.target.value) || 0
                }));
              }}
              className="font-medium h-8"
            />
          ) : (
            <p className="font-medium">{contract.users?.active.toString() || '-'}</p>
          )
        )}
      />
      
      <ContractFormField 
        label="Owner"
        isEditing={isEditing}
        value={contract.owner || '-'}
        onChange={(value) => handleInputChange('owner', value)}
      />
    </div>
  );
};

export default ContractDetailsForm;
