
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface User {
  email: string;
  count: number;
}

interface UserListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  appName: string;
}

const UserListDialog: React.FC<UserListDialogProps> = ({ 
  isOpen, 
  onClose, 
  users,
  appName
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredUsers = React.useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{appName} Users ({users.length})</DialogTitle>
          <DialogDescription>
            View all users who have accessed this application
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center border rounded-md px-3 py-2 mb-4">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <Input 
            placeholder="Search users..." 
            className="border-0 focus-visible:ring-0 p-0 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ScrollArea className="flex-1 max-h-[500px] pr-4">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Usage Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <TableRow key={index} className="h-[60px]">
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-3.5 w-3.5 text-gray-400 mr-2" />
                        <span>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="ml-2">
                        {user.count} {user.count === 1 ? 'usage' : 'usages'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-[200px] text-center text-muted-foreground">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UserListDialog;
