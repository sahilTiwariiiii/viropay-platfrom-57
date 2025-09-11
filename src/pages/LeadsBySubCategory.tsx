import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getLeadsBySubcategory, getLeadDetails } from '@/api/leads';

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
    getLeadDetails(leadId)
      .then(data => setLeadDetails(data))
      .catch(() => setLeadDetails({ error: 'Failed to load details' }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 min-h-screen">
      <div className="w-full px-2 pt-4 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight text-foreground break-words">
              Leads for <span className="text-primary">{subcategoryName}</span>
            </h1>
          </div>
          <Button className="bg-saas-blue hover:bg-saas-blue/90" onClick={() => {}}>
            Transfer to Clients
          </Button>
        </div>
      </div>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {!leadDetails ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-6 w-1/2 bg-gray-200 rounded shimmer" />
                  <div className="h-6 w-1/3 bg-gray-200 rounded shimmer" />
                  <div className="h-6 w-1/4 bg-gray-200 rounded shimmer" />
                </div>
              ) : leadDetails.error ? (
                <div className="text-red-500">{leadDetails.error}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(leadDetails).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="font-semibold text-xs text-muted-foreground">{key}</span>
                      <span className="text-sm text-foreground break-all">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
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
