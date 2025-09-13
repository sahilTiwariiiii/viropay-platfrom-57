import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateClientUser } from '@/api/clientUsers';
import { updateUserCredentials } from '@/api/users';

interface ManageCredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  initialData?: {
    username: string | null;
    email: string | null;
    password: string;
    role: string;
    company: string;
    phone: string;
    address: string;
    description: string;
    active: boolean;
    isCredentialSet?: boolean;
    loginEmail?: string | null;
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
    password: '',
    role: initialData?.role || 'CLIENT',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // When modal opens or initialData changes, reset form to initialData
  useEffect(() => {
    if (open) {
      setForm({
        username: initialData?.username || '',
        email: initialData?.email || '',
        password: '',
        role: initialData?.role || 'CLIENT',
      });
      setError('');
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Determine if credentials are set using isCredentialSet, loginEmail, and username
  const credentialsSet = Boolean(
    initialData && (
      initialData.isCredentialSet === true ||
      (initialData.loginEmail && initialData.username)
    )
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (!credentialsSet) {
        // Create user
        await updateUserCredentials({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
          clientId: clientId,
        });
      } else {
        // Update user
        await updateClientUser(clientId, {
          username: form.username,
          email: form.email,
          password: form.password || null,
        });
      }
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
      <DialogContent className="max-w-lg p-8 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold mb-2">Manage Client Credentials</DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} autoComplete="off" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} autoComplete="off" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" autoComplete="new-password" />
              <span className="text-xs text-gray-400">Leave blank to keep unchanged</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Input name="role" placeholder="Role" value={form.role} disabled className="bg-gray-100 cursor-not-allowed" />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
            <DialogFooter className="mt-6 flex gap-2 justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
              <Button className="bg-saas-blue hover:bg-saas-blue/90 min-w-[100px]" type="submit" disabled={loading}>
                {loading
                  ? 'Saving...'
                  : (initialData?.isCredentialSet === true)
                    ? 'Update'
                    : 'Set'}
              </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
