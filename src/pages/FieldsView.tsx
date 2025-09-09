import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';

// Dummy data for fields by subcategory
const mockFields = {
  'Software|CRM Software': [
    { id: '1', name: 'Company Name', type: 'text', required: true },
    { id: '2', name: 'Contact Email', type: 'email', required: true },
  ],
  'Software|Project Management': [
    { id: '3', name: 'Project Name', type: 'text', required: true },
    { id: '4', name: 'Deadline', type: 'date', required: false },
  ],
  'Hardware|Computer Hardware': [
    { id: '5', name: 'Serial Number', type: 'text', required: true },
  ],
};

const FieldsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const key = `${category}|${subcategory}`;
  const fields = mockFields[key] || [];

  const handleAddField = () => {
    // Implement add field logic or navigation
    alert('Add new field (to be implemented)');
  };

  const handleEditField = (id) => {
    // Implement edit field logic or navigation
    alert(`Edit field ${id} (to be implemented)`);
  };

  const handleDeleteField = (id) => {
    // Implement delete field logic
    alert(`Delete field ${id} (to be implemented)`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title={`Fields for ${subcategory}`}
        subtitle={`Manage fields for ${category} / ${subcategory}`}
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />
      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <Card className="max-w-3xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Fields</h2>
              <Button onClick={handleAddField} className="bg-saas-blue hover:bg-saas-blue/90">
                <Plus className="mr-2 h-4 w-4" /> Add Field
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.length > 0 ? (
                    fields.map((field) => (
                      <TableRow key={field.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="font-medium">{field.name}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-50">
                            {field.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {field.required ? (
                            <Badge className="text-xs px-2 py-0.5 bg-red-100 text-red-800 border-red-200">Required</Badge>
                          ) : (
                            <span className="text-xs text-gray-400">Optional</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditField(field.id)}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => handleDeleteField(field.id)}>
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10">No fields found for this subcategory.</TableCell>
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

export default FieldsView;
