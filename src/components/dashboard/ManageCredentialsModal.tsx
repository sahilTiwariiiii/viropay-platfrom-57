 import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getClientUser, updateClientUser } from '@/api/clientUsers';

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
    password: '',
    role: initialData?.role || 'CLIENT',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (open && clientId) {
      setFetching(true);
      getClientUser(clientId)
        .then(data => {
          setForm({
            username: data.username || '',
            email: data.email || '',
            password: '',
            role: data.role || 'CLIENT',
          });
        })
        .catch(() => setError('Failed to fetch client details'))
        .finally(() => setFetching(false));
    }
  }, [open, clientId]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await updateClientUser(clientId, {
        username: form.username,
        password: form.password || null,
      });
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
        {fetching ? (
          <div className="py-8 text-center text-gray-500">Loading client details...</div>
        ) : (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} autoComplete="off" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" placeholder="Email" value={form.email} disabled className="bg-gray-100 cursor-not-allowed" />
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
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
