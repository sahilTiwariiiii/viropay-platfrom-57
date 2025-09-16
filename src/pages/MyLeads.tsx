import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import api from '@/api/index';

const MyLeads: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/api/v1/lead-transfers/my?page=0&size=20')
      .then(res => setLeads(res.data.content || res.data || []))
      .catch(err => setError(err.response?.data?.message || err.message || 'Failed to load leads'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <Header title="My Leads" subtitle="View all your leads" showBackButton={false} />
      <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : leads.length === 0 ? (
                <div className="text-center text-muted-foreground">No leads found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead, idx) => (
                      <TableRow key={lead.id || idx}>
                        <TableCell>{lead.name || '-'}</TableCell>
                        <TableCell>{lead.email || '-'}</TableCell>
                        <TableCell>
                          <Badge variant={lead.status === 'COMPLETED' ? 'default' : 'secondary'}>
                            {lead.status || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MyLeads;
