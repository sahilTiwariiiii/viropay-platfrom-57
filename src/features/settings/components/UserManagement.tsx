
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, UserX, Mail } from 'lucide-react';
import { User } from '../types';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const UserManagement = () => {
  const [users, setUsers] = React.useState<User[]>([
    { name: 'John Doe', email: 'john.doe@virocards.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane.smith@virocards.com', role: 'Member', status: 'Active' },
    { name: 'Alex Johnson', email: 'alex.johnson@virocards.com', role: 'Viewer', status: 'Pending' }
  ]);
  
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<User['role']>('Member');
  
  const handleInviteUser = () => {
    if (!newUserEmail || !newUserEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the new user to the users array
    const newUser: User = {
      name: newUserEmail.split('@')[0], // Extract name from email
      email: newUserEmail,
      role: newUserRole,
      status: 'Pending'
    };
    
    setUsers([...users, newUser]);
    
    // Reset form and close modal
    setNewUserEmail('');
    setNewUserRole('Member');
    setIsInviteModalOpen(false);
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newUserEmail}`,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-1">User Management</h2>
          <p className="text-gray-500">Manage users and their permissions</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => setIsInviteModalOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                  ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 
                    user.role === 'Member' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'}`
                }>
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                  ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'}`
                }>
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {user.status === 'Active' ? (
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Invitation resent",
                      description: `An invitation has been resent to ${user.email}`,
                    });
                  }}>
                    Resend
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setUsers(users.filter((_, i) => i !== index));
                    toast({
                      title: "User removed",
                      description: `${user.name} has been removed from the system`,
                    });
                  }}
                >
                  <UserX className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 border-t text-sm text-gray-500">
        Showing {users.length} users
      </div>
      
      {/* Invite User Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to a new team member.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Input 
                  id="email" 
                  placeholder="colleague@example.com" 
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUserRole} onValueChange={(value: User['role']) => setNewUserRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleInviteUser}>Invite User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
