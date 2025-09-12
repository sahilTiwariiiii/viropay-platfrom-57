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
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Leads Transferred to Client #{clientId}</h1>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Lead</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Transferred At</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leadTransfers.map((transfer, idx) => (
                    <tr key={transfer.id} className="border-b">
                      <td className="px-4 py-2 font-semibold">Lead {idx + 1 + page * PAGE_SIZE}</td>
                      <td className="px-4 py-2">{transfer.status}</td>
                      <td className="px-4 py-2">{new Date(transfer.transferredAt).toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedLead(transfer.lead); setDetailsDialogOpen(true); }}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {leadTransfers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-500">No leads found for this client.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
                <span className="text-xs">Page {page + 1} of {totalPages}</span>
                <Button size="sm" variant="outline" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Lead Details Modal */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {!selectedLead ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-1">
                <div><span className="font-semibold">Lead ID:</span> {selectedLead.id}</div>
                <div><span className="font-semibold">Subcategory:</span> {selectedLead.subcategoryName} (ID: {selectedLead.subcategoryId})</div>
                <div><span className="font-semibold">Status:</span> {selectedLead.status}</div>
                <div><span className="font-semibold">Notes:</span> {selectedLead.notes}</div>
                <div><span className="font-semibold">IP Address:</span> {selectedLead.ipAddress}</div>
                <div><span className="font-semibold">User Agent:</span> <span className="break-all">{selectedLead.userAgent}</span></div>
                <div><span className="font-semibold">Created At:</span> {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : '-'}</div>
                <div><span className="font-semibold">Updated At:</span> {selectedLead.updateAt ? new Date(selectedLead.updateAt).toLocaleString() : '-'}</div>
                <div><span className="font-semibold">Lead Data:</span>
                  <pre className="bg-gray-100 rounded p-2 overflow-x-auto text-xs mt-1">{JSON.stringify(selectedLead.dataJson, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientLeadTransfersPage;
