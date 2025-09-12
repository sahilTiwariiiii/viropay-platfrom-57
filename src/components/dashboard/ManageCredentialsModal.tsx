import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateUserCredentials } from '@/api/users';

interface ManageCredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  initialData?: {
    username: string;
    email: string;
    password: string;
    role: string;
  };
  onSuccess: () => void;
}

export const ManageCredentialsModal: React.FC<ManageCredentialsModalProps> = ({
  open,
  onOpenChange,
  clientId,
  initialData,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    username: initialData?.username || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    role: initialData?.role || 'CLIENT',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await updateUserCredentials({ ...form, clientId });
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Client Credentials</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <label className="block text-sm font-medium">Username
            <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
          </label>
          <label className="block text-sm font-medium">Email
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </label>
          <label className="block text-sm font-medium">Password
            <Input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" />
          </label>
          <label className="block text-sm font-medium">Role
            <Input name="role" placeholder="Role" value={form.role} onChange={handleChange} disabled />
          </label>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
          <Button className="bg-saas-blue hover:bg-saas-blue/90" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
