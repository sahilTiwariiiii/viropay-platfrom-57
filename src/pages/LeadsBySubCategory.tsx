import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getLeadsBySubcategory, getLeadDetails } from '@/api/leads';
import { transferLeadsToClients, LeadTransferPayload } from '@/api/leadTransfers';
import { getClients, getClientDetails, Client } from '@/api/clients';

const PAGE_SIZE = 20;

const LeadsBySubCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subcategoryId = searchParams.get('subcategoryId');
  const subcategoryName = searchParams.get('subcategoryName');
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [leadDetails, setLeadDetails] = useState<any>(null);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState('');
  const [transferNotes, setTransferNotes] = useState('');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState('');
  const [clientDetailsDialogOpen, setClientDetailsDialogOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState<Client | null>(null);
  // Fetch clients when transfer dialog opens
  useEffect(() => {
    if (transferDialogOpen) {
      setClientsLoading(true);
      setClientsError('');
      getClients('', 0, 20)
        .then(data => setClients(data.content || []))
        .catch(() => setClientsError('Failed to load clients'))
        .finally(() => setClientsLoading(false));
    }
  }, [transferDialogOpen]);

  useEffect(() => {
    if (!subcategoryId) return;
    setLoading(true);
    setError('');
    getLeadsBySubcategory(subcategoryId, page, PAGE_SIZE, 'NEW')
      .then(data => {
        setLeads(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setError('Failed to load leads'))
      .finally(() => setLoading(false));
  }, [subcategoryId, page]);

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((l: any) => l.id));
    }
  };

  const handleSelectLead = (id: number) => {
    setSelectedLeads(selectedLeads.includes(id)
      ? selectedLeads.filter(lid => lid !== id)
      : [...selectedLeads, id]);
  };

  const handleViewDetails = (leadId: number) => {
    setDetailsDialogOpen(true);
    setLeadDetails(null);
    getLeadDetails(String(leadId))
      .then(data => setLeadDetails(data))
      .catch(() => setLeadDetails({ error: 'Failed to load details' }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 min-h-screen">
      <div className="w-full px-2 pt-4 pb-2 flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="w-full sm:w-auto mt-10 sm:mt-0">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight text-foreground break-words">
              Leads for <span className="text-primary">{subcategoryName}</span>
            </h1>
          </div>
          <div className="w-full sm:w-auto flex justify-end sm:justify-start">
            <Button
              className="bg-saas-blue hover:bg-saas-blue/90"
              onClick={() => setTransferDialogOpen(true)}
              disabled={selectedLeads.length === 0}
            >
              Transfer to Clients
            </Button>
          </div>
        </div>
      </div>
      {/* Transfer to Clients Modal */}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Transfer Leads to Clients</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Selected Lead IDs</label>
              <div className="flex flex-wrap gap-2">
                {selectedLeads.map(id => (
                  <span key={id} className="px-2 py-1 bg-gray-200 rounded text-xs">{id}</span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Clients</label>
              {clientsLoading ? (
                <div className="text-xs text-gray-500">Loading clients...</div>
              ) : clientsError ? (
                <div className="text-xs text-red-500">{clientsError}</div>
              ) : (
                <div className="border rounded p-2 max-h-48 overflow-y-auto">
                  {clients.map(client => (
                    <div key={client.id} className="flex items-center justify-between py-1 border-b last:border-b-0">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={() => {
                            setSelectedClients(selectedClients.includes(client.id)
                              ? selectedClients.filter(cid => cid !== client.id)
                              : [...selectedClients, client.id]);
                          }}
                        />
                        <span className="text-sm font-medium">{client.name}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={async () => {
                        setClientDetailsDialogOpen(true);
                        setClientDetails(null);
                        try {
                          const details = await getClientDetails(client.id);
                          setClientDetails(details);
                        } catch {
                          setClientDetails({ ...client, error: 'Failed to load details' });
                        }
                      }}>View Details</Button>
                    </div>
                  ))}
                  {clients.length === 0 && <div className="text-xs text-gray-500">No clients found.</div>}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes (optional)</label>
              <textarea
                className="w-full border rounded px-2 py-1"
                rows={2}
                value={transferNotes}
                onChange={e => setTransferNotes(e.target.value)}
                placeholder="September campaign"
              />
            </div>
            {transferError && <div className="text-red-500 text-sm">{transferError}</div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTransferDialogOpen(false)} disabled={transferLoading}>Cancel</Button>
            <Button
              className="bg-saas-blue hover:bg-saas-blue/90"
              disabled={transferLoading || selectedClients.length === 0}
              onClick={async () => {
                setTransferLoading(true);
                setTransferError("");
                try {
                  await transferLeadsToClients({
                    leadIds: selectedLeads,
                    clientIds: selectedClients,
                    notes: transferNotes,
                  });
                  setTransferDialogOpen(false);
                  setSelectedLeads([]);
                  setSelectedClients([]);
                  setTransferNotes("");
                } catch (err: any) {
                  setTransferError(err?.response?.data?.message || "Failed to transfer leads");
                } finally {
                  setTransferLoading(false);
                }
              }}
            >
              {transferLoading ? "Transferring..." : "Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Details Modal */}
      <Dialog open={clientDetailsDialogOpen} onOpenChange={setClientDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {!clientDetails ? (
              <div className="text-xs text-gray-500">Loading...</div>
            ) : clientDetails.error ? (
              <div className="text-xs text-red-500">{clientDetails.error}</div>
            ) : (
              <div className="space-y-1">
                <div><span className="font-semibold">Name:</span> {clientDetails.name}</div>
                <div><span className="font-semibold">Email:</span> {clientDetails.email}</div>
                <div><span className="font-semibold">Company:</span> {clientDetails.company}</div>
                <div><span className="font-semibold">Phone:</span> {clientDetails.phone}</div>
                <div><span className="font-semibold">Address:</span> {clientDetails.address}</div>
                <div><span className="font-semibold">Description:</span> {clientDetails.description}</div>
                <div><span className="font-semibold">Active:</span> {clientDetails.active ? 'Yes' : 'No'}</div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 animate-fade-in">
        <Card className="w-full max-w-5xl mx-auto mb-8">
          <CardContent className="p-2 sm:p-4 md:p-6">
            <div className="overflow-x-auto w-full">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4 py-2">
                      <div className="h-6 w-6 bg-gray-200 rounded shimmer" />
                      <div className="h-6 w-1/4 bg-gray-200 rounded shimmer" />
                      <div className="h-6 w-1/2 bg-gray-200 rounded shimmer" />
                      <div className="h-6 w-20 bg-gray-200 rounded shimmer" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead>
                        <Checkbox checked={selectedLeads.length === leads.length && leads.length > 0} onCheckedChange={handleSelectAll} className="h-4 w-4 rounded-sm" />
                      </TableHead>
                      <TableHead>Lead #</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.length > 0 ? (
                      leads.map((lead: any, idx: number) => (
                        <TableRow key={lead.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Checkbox checked={selectedLeads.includes(lead.id)} onCheckedChange={() => handleSelectLead(lead.id)} className="h-4 w-4 rounded-sm" />
                          </TableCell>
                          <TableCell>Lead {idx + 1 + page * PAGE_SIZE}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(lead.id)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-10">
                          No leads found for this subcategory.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
            {/* Pager */}
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <div className="text-xs text-muted-foreground">
                Page {page + 1} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <Button size="sm" variant="outline" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Details Dialog */}
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="max-w-2xl p-0">
            <div className="flex flex-col max-h-[90vh] sm:max-h-[80vh] w-full">
              <div className="relative px-6 pt-6 pb-2">
                <DialogTitle>Lead Details</DialogTitle>
                {/* Only one close button, absolutely positioned */}
                <DialogClose asChild>
                  <button
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
                    aria-label="Close"
                    type="button"
                  >
                    {/* <span aria-hidden="true">&times;</span> */}
                  </button>
                </DialogClose>
              </div>
              <div
                className="flex-1 px-6 pb-6 pt-2 scrollbar-hide"
                style={{
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  maxHeight: 'calc(90vh - 60px)',
                  minHeight: '100px',
                }}
                tabIndex={0}
              >
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar { display: none !important; }
                  .scrollbar-hide { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                `}</style>
                <div className="space-y-4">
                  {!leadDetails ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-6 w-1/2 bg-gray-200 rounded shimmer" />
                      <div className="h-6 w-1/3 bg-gray-200 rounded shimmer" />
                      <div className="h-6 w-1/4 bg-gray-200 rounded shimmer" />
                    </div>
                  ) : leadDetails.error ? (
                    <div className="text-red-500">{leadDetails.error}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">Lead ID</div>
                          <div className="text-base font-bold text-primary">{leadDetails.id}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">Subcategory</div>
                          <div className="text-base font-bold text-primary">{leadDetails.subcategoryName} (ID: {leadDetails.subcategoryId})</div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">Status</div>
                          <div className="text-base font-semibold text-blue-700">{leadDetails.status}</div>
                        </div>
                        {/* Source field removed as per user request */}
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">IP Address</div>
                          <div className="text-sm text-foreground">{leadDetails.ipAddress}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">User Agent</div>
                          <div className="text-xs text-foreground break-all">{leadDetails.userAgent}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">Created At</div>
                          <div className="text-sm text-foreground">
                            {leadDetails.createdAt ?
                              new Date(leadDetails.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                              }) : '-'}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground mb-1">Updated At</div>
                          <div className="text-sm text-foreground">
                            {leadDetails.updateAt ?
                              new Date(leadDetails.updateAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                              }) : '-'}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="font-semibold text-xs text-muted-foreground mb-1">Notes</div>
                          <div className="text-sm text-foreground whitespace-pre-line">{leadDetails.notes || '-'}</div>
                        </div>
                      </div>
                      {leadDetails.dataJson && (
                        <div className="mt-4">
                          <div className="font-semibold text-xs text-muted-foreground mb-2">Lead Data</div>
                          <div className="bg-gray-50 border rounded p-3 overflow-x-auto">
                            {(() => {
                              let data;
                              try {
                                data = typeof leadDetails.dataJson === 'string' ? JSON.parse(leadDetails.dataJson) : leadDetails.dataJson;
                              } catch {
                                data = leadDetails.dataJson;
                              }
                              if (typeof data === 'object' && data !== null) {
                                return (
                                  <table className="w-full text-xs">
                                    <tbody>
                                      {Object.entries(data).map(([k, v]) => (
                                        <tr key={k} className="border-b last:border-b-0">
                                          <td className="font-semibold pr-2 py-1 align-top text-muted-foreground whitespace-nowrap">{k}</td>
                                          <td className="py-1">
                                            {typeof v === 'string' && v.startsWith('http') ? (
                                              <a href={v} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{v}</a>
                                            ) : typeof v === 'boolean' ? (
                                              <span className={v ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>{v ? 'Yes' : 'No'}</span>
                                            ) : (
                                              <span>{String(v)}</span>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                );
                              } else {
                                return <span className="text-xs text-foreground">{String(data)}</span>;
                              }
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      {/* Shimmer effect styles */}
      <style>{`
        .shimmer {
          background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LeadsBySubCategory;
