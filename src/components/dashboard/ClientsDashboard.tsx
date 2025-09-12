import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Loader2,
  ExternalLink,
  KeyRound
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { 
  Client, 
  CreateClientData,
  USE_MOCK_DATA,
  getMockClients,
  getMockClientById,
  createMockClient,
  updateMockClient,
  deleteMockClient,
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '@/lib/api';
import { ClientForm } from './ClientForm';
import { ClientDetails} from './ClientDetails'
import { ManageCredentialsModal } from './ManageCredentialsModal';


type DialogMode = 'create' | 'edit' | 'view' | null;


interface CredentialsData {
  username: string;
  email: string;
  password: string;
  role: string;
}


export const ClientsDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [credentialsClientId, setCredentialsClientId] = useState<number | null>(null);
  const [credentialsInitial, setCredentialsInitial] = useState<CredentialsData | undefined>(undefined);
  const navigate = useNavigate();
  const [totalClients, setTotalClients] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Statistics
  const activeClientsCount = clients.filter(c => c.active).length;
  const inactiveClientsCount = clients.filter(c => !c.active).length;

  const fetchClients = async () => {
    try {
      setLoading(true);
      let response;
      if (USE_MOCK_DATA) {
        response = await getMockClients(currentPage, searchTerm);
      } else {
        response = await getClients(currentPage, searchTerm);
      }
      setClients(response.content);
      setTotalClients(response.totalElements);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to fetch clients. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setCurrentPage(0);
      // Wrap fetchClients in async IIFE
      (async () => { await fetchClients(); })();
    }, 300);
    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  useEffect(() => {
    // Wrap fetchClients in async IIFE
    (async () => { await fetchClients(); })();
  }, [currentPage]);

  const handleCreateClient = async (data: CreateClientData) => {
    try {
      setFormLoading(true);
      
      if (USE_MOCK_DATA) {
        await createMockClient(data);
      } else {
        await createClient(data);
      }
      
      toast({
        title: "Success",
        description: "Client created successfully",
      });
      
      setDialogMode(null);
      fetchClients();
    } catch (error) {
      console.error('Error creating client:', error);
      toast({
        title: "Error",
        description: "Failed to create client. Please try again.",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateClient = async (data: CreateClientData) => {
    if (!selectedClient) return;
    
    try {
      setFormLoading(true);
      
      if (USE_MOCK_DATA) {
        await updateMockClient(selectedClient.id, data);
      } else {
        await updateClient(selectedClient.id, data);
      }
      
      toast({
        title: "Success",
        description: "Client updated successfully",
      });
      
      setDialogMode(null);
      setSelectedClient(null);
      fetchClients();
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: "Error",
        description: "Failed to update client. Please try again.",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    
    try {
      if (USE_MOCK_DATA) {
        await deleteMockClient(clientToDelete.id);
      } else {
        await deleteClient(clientToDelete.id);
      }
      
      toast({
        title: "Success",
        description: "Client deleted successfully",
      });
      
      setDeleteDialogOpen(false);
      setClientToDelete(null);
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewClient = async (client: Client) => {
    try {
      let fullClient: Client;
      
      if (USE_MOCK_DATA) {
        fullClient = await getMockClientById(client.id);
      } else {
        fullClient = await getClientById(client.id);
      }
      
      setSelectedClient(fullClient);
      setDialogMode('view');
    } catch (error) {
      console.error('Error fetching client details:', error);
      toast({
        title: "Error",
        description: "Failed to load client details. Please try again.",
        variant: "destructive"
      });
    }
  };

  const openDeleteDialog = (client: Client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogMode(null);
    setSelectedClient(null);
  };

  const totalPages = Math.ceil(totalClients / 20);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button 
            onClick={() => setDialogMode('create')}
            className="admin-button-primary w-fit"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
              <p className="text-xs text-muted-foreground">All registered clients</p>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <UserCheck className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{activeClientsCount}</div>
              <p className="text-xs text-muted-foreground">Currently active accounts</p>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Clients</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{inactiveClientsCount}</div>
              <p className="text-xs text-muted-foreground">Disabled accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="admin-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="admin-card">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading clients...</span>
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No clients found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first client'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setDialogMode('create')} className="admin-button-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Client
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client, index) => (
                      <TableRow 
                        key={client.id} 
                        className="admin-table-row fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <TableCell className="font-medium flex items-center gap-2">
                          {client.name}
                          <button
                            type="button"
                            title="View transferred leads"
                            className="inline-flex items-center hover:text-blue-600 focus:outline-none"
                            onClick={() => navigate(`/client-lead-transfers/${client.id}`)}
                          >
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </button>
                        </TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>
                          <Badge variant={client.active ? "default" : "secondary"}>
                            {client.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewClient(client)}
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Manage Credentials"
                              onClick={() => {
                                setCredentialsClientId(client.id);
                                setCredentialsInitial({
                                  username: client.name || '',
                                  email: client.email || '',
                                  password: '',
                                  role: 'CLIENT',
                                });
                                setCredentialsModalOpen(true);
                              }}
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              <KeyRound className="h-4 w-4" />
                            </Button>
      <ManageCredentialsModal
        open={credentialsModalOpen}
        onOpenChange={setCredentialsModalOpen}
        clientId={credentialsClientId ?? 0}
        initialData={credentialsInitial}
        onSuccess={fetchClients}
      />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedClient(client);
                                setDialogMode('edit');
                              }}
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(client)}
                              className="hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="admin-card">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {currentPage * 20 + 1} to {Math.min((currentPage + 1) * 20, totalClients)} of {totalClients} clients
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm bg-muted rounded">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dialogs */}
        <Dialog open={dialogMode !== null} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sr-only">
              <div>Client Management Dialog</div>
            </DialogHeader>
            {dialogMode === 'create' && (
              <ClientForm
                onSubmit={handleCreateClient}
                onCancel={closeDialog}
                isLoading={formLoading}
              />
            )}
            {dialogMode === 'edit' && selectedClient && (
              <ClientForm
                client={selectedClient}
                onSubmit={handleUpdateClient}
                onCancel={closeDialog}
                isLoading={formLoading}
              />
            )}
            {dialogMode === 'view' && selectedClient && (
              <ClientDetails
                client={selectedClient}
                onEdit={() => setDialogMode('edit')}
                onDelete={() => {
                  setDialogMode(null);
                  openDeleteDialog(selectedClient);
                }}
                onClose={closeDialog}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{clientToDelete?.name}</strong> and remove all their data from the system. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClient}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Client
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}