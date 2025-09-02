
import React, { ReactNode } from 'react';
import { Input } from '@/components/ui/input';

interface ContractFormFieldProps {
  label: string;
  isEditing: boolean;
  value: string | number | ReactNode;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
  render?: () => ReactNode;
}

const ContractFormField: React.FC<ContractFormFieldProps> = ({
  label,
  isEditing,
  value,
  onChange,
  type = 'text',
  className = '',
  render
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      {isEditing && onChange ? (
        <Input 
          type={type}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={`font-medium h-8 ${className}`}
        />
      ) : render ? (
        render()
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  );
};

export default ContractFormField;
