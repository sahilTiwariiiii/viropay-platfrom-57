
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

// Dummy data for categories, subcategories, and fields
const mockData = [
  {
    category: 'Software',
    subcategory: 'CRM Software',
    fields: [
      { id: '1', name: 'Company Name', type: 'text', required: true },
      { id: '2', name: 'Contact Email', type: 'email', required: true },
    ],
  },
  {
    category: 'Software',
    subcategory: 'Project Management',
    fields: [
      { id: '3', name: 'Project Name', type: 'text', required: true },
      { id: '4', name: 'Deadline', type: 'date', required: false },
    ],
  },
  {
    category: 'Hardware',
    subcategory: 'Computer Hardware',
    fields: [
      { id: '5', name: 'Serial Number', type: 'text', required: true },
    ],
  },
];

const Fields = () => {
  const navigate = useNavigate();

  const handleSeeFields = (category, subcategory) => {
  navigate(`/fields/view?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Fields"
        subtitle="Manage and explore fields by category and subcategory"
        showBackButton={false}
      />
      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <Card className="max-w-5xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Categories & Subcategories</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50">
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50 text-base px-3 py-1">
                          {row.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{row.subcategory}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="bg-saas-blue text-white hover:bg-saas-blue/90"
                          onClick={() => handleSeeFields(row.category, row.subcategory)}
                        >
                          See Fields
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mockData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-10">No data found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Fields;