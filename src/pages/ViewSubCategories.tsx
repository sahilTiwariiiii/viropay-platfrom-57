
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { generateMockSubCategories, SubCategory } from '@/features/subcategories/utils/generateSubCategoriesData';
import { Plus, ArrowLeft, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const ViewSubCategories = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  // Get all subcategories and filter by the selected category
  const allSubCategories = generateMockSubCategories();
  const filteredSubCategories = category
    ? allSubCategories.filter(sub => sub.category === category)
    : allSubCategories;

  // Handler for back button
  const handleBack = () => {
    navigate('/categories');
  };

  // Handler for add subcategory button
  const handleAddSubCategory = () => {
    navigate('/subcategories/add');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title={category ? `${category} Subcategories` : "All Subcategories"}
        subtitle="View and manage subcategories"
        showBackButton={true}
        onBackClick={handleBack}
      />
      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <Card className="max-w-5xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {category ? `${category} Subcategories` : "All Subcategories"}
              </h2>
              <Button onClick={handleAddSubCategory} className="bg-saas-blue hover:bg-saas-blue/90">
                <Plus className="mr-2 h-4 w-4" /> Add Subcategory
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubCategories.length > 0 ? (
                    filteredSubCategories.map((subCategory: SubCategory) => (
                      <TableRow key={subCategory.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="font-medium">{subCategory.name}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-50">
                            {subCategory.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">{subCategory.description}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{subCategory.count}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                              <Trash className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        {category ? `No subcategories found for ${category}` : "No subcategories found."}
                      </TableCell>
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

export default ViewSubCategories;