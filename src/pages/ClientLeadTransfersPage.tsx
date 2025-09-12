import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeadTransfersByClient, LeadTransfer } from '@/api/leadTransfersByClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PAGE_SIZE = 20;

const ClientLeadTransfersPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [leadTransfers, setLeadTransfers] = useState<LeadTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    if (!clientId) return;
    setLoading(true);
    setError('');
    getLeadTransfersByClient(Number(clientId), page, PAGE_SIZE)
      .then(data => {
        setLeadTransfers((data.content || []).sort((a, b) => new Date(b.transferredAt).getTime() - new Date(a.transferredAt).getTime()));
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setError('Failed to load lead transfers'))
      .finally(() => setLoading(false));
  }, [clientId, page]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Leads Transferred to Client #{clientId}</h1>
      <div className="max-w-5xl w-full mx-auto">
        <div className="bg-white rounded shadow overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-lg">Loading...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Transferred At</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {leadTransfers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">No leads found for this client.</td>
                  </tr>
                ) : (
                  leadTransfers.map((transfer, idx) => (
                    <tr key={transfer.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-semibold text-primary">Lead {idx + 1 + page * PAGE_SIZE}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${transfer.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{transfer.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(transfer.transferredAt).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedLead(transfer.lead); setDetailsDialogOpen(true); }}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination */}
        {leadTransfers.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
            <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
            <span className="text-xs">Page {page + 1} of {totalPages}</span>
            <Button size="sm" variant="outline" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        )}
      </div>
      {/* Lead Details Modal */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl p-0">
          <div className="flex flex-col md:flex-row max-h-[90vh] w-full">
            <div className="flex-1 p-6 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl mb-4">Lead Details</DialogTitle>
              </DialogHeader>
              {!selectedLead ? (
                <div className="text-center py-10 text-muted-foreground">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Lead ID</div>
                    <div className="text-base font-bold text-primary">{selectedLead.id}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Subcategory</div>
                    <div className="text-base font-bold text-primary">{selectedLead.subcategoryName} (ID: {selectedLead.subcategoryId})</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Status</div>
                    <div className="text-base font-semibold text-blue-700">{selectedLead.status}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Notes</div>
                    <div className="text-sm text-foreground whitespace-pre-line">{selectedLead.notes || '-'}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">IP Address</div>
                    <div className="text-sm text-foreground">{selectedLead.ipAddress}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="font-semibold text-xs text-muted-foreground mb-1">User Agent</div>
                    <div className="text-xs text-foreground break-all">{selectedLead.userAgent}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Created At</div>
                    <div className="text-sm text-foreground">{selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : '-'}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Updated At</div>
                    <div className="text-sm text-foreground">{selectedLead.updateAt ? new Date(selectedLead.updateAt).toLocaleString() : '-'}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="font-semibold text-xs text-muted-foreground mb-1">Lead Data</div>
                    <div className="bg-gray-50 border rounded p-3 overflow-x-auto text-xs">
                      <pre className="whitespace-pre-wrap break-words">{JSON.stringify(selectedLead.dataJson, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientLeadTransfersPage;
