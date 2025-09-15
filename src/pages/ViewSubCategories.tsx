import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { getSubCategoriesByCategory, updateSubCategory, deleteSubCategory, SubCategory } from '@/api/subcategories';
import { uploadFile } from '@/api/uploadFile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// ...existing code...
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash, Image as LucideImage } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ViewSubCategories = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');

  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dialog state for editing
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState<SubCategory | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Dialog state for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SubCategory | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    setError('');

    getSubCategoriesByCategory(Number(categoryId))
      .then(data => {
        console.log('Subcategories API response:', data);
        setSubcategories(Array.isArray(data) ? data : []);
      })
      .catch(err =>
        setError(err.response?.data?.message || err.message || 'Failed to load subcategories')
      )
      .finally(() => setLoading(false));
  }, [categoryId]);

  // Back to categories list
  const handleBack = () => {
    navigate('/categories');
  };

  // Go to add subcategory page with categoryId and categoryName
  const handleAddSubCategory = () => {
    if (categoryId && categoryName) {
      navigate(`/subcategories/add?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
    } else {
      navigate('/subcategories/add');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title={`Subcategories of ${categoryName || ''}`}
        subtitle="View and manage subcategories"
        showBackButton={true}
        onBackClick={handleBack}
      />
      <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 animate-fade-in">
        <Card className="w-full max-w-5xl mx-auto mb-8">
          <CardContent className="p-2 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Subcategories of {categoryName || ''}
              </h2>
              <Button onClick={handleAddSubCategory} className="bg-saas-blue hover:bg-saas-blue/90 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="mr-2 h-4 w-4 " /> Add Subcategory
              </Button>
            </div>
            <div className="overflow-x-auto w-full">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4 py-2">
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                      <div className="h-6 bg-gray-200 rounded w-1/2" />
                      <div className="h-6 bg-gray-200 rounded w-20" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subcategories.length > 0 ? (
                      subcategories.map((subCategory: SubCategory) => (
                        <TableRow key={subCategory.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-8 w-8">
                                {subCategory.imageUrl ? (
                                  <AvatarImage
                                    src={subCategory.imageUrl}
                                    alt={subCategory.name}
                                    onError={e => {
                                      // Hide broken image, fallback will show
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : null}
                                <AvatarFallback className="bg-gray-200">
                                  <LucideImage className="h-4 w-4 text-gray-400" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{subCategory.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-700">
                              {subCategory.description}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 whitespace-nowrap">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Navigate to fields view with category, subcategory, and subcategoryId
                                  navigate(`/fields/view?category=${encodeURIComponent(categoryName || '')}&subcategory=${encodeURIComponent(subCategory.name)}&subcategoryId=${subCategory.id}`);
                                }}
                              >
                                See Fields
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Navigate to leads page for this subcategory
                                  navigate(`/leadsbysubcategory?subcategoryId=${subCategory.id}&subcategoryName=${encodeURIComponent(subCategory.name)}`);
                                }}
                              >
                                Leads
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditSubCategory(subCategory);
                                  setEditName(subCategory.name);
                                  setEditDescription(subCategory.description || '');
                                  setEditImageUrl((subCategory as any).imageUrl || '');
                                  setEditActive(subCategory.active !== false);
                                  setEditDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-1" /> Edit
                              </Button>
      {/* Edit Subcategory Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Subcategory name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Input
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image</label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={editImageUrl}
                  onChange={e => setEditImageUrl(e.target.value)}
                  placeholder="Image URL"
                  className="flex-1"
                  readOnly={uploadingImage}
                />
                <div className="flex items-center gap-2">
                  <input
                    id="edit-image-upload-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    disabled={uploadingImage}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingImage(true);
                      setUploadedFileName('');
                      try {
                        let url = await uploadFile(file);
                        if (
                          typeof url === 'object' &&
                          url !== null &&
                          'url' in url &&
                          (url as any).url !== undefined &&
                          (url as any).url !== null
                        ) {
                          url = (url as any).url as string;
                        }
                        setEditImageUrl(typeof url === 'string' ? url : '');
                        setUploadedFileName(file.name);
                      } catch (err: any) {
                        alert('Image upload failed!');
                      } finally {
                        setUploadingImage(false);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    disabled={uploadingImage}
                    onClick={() => {
                      const input = document.getElementById('edit-image-upload-input') as HTMLInputElement;
                      if (input) input.click();
                    }}
                  >
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
              {uploadedFileName && (
                <div className="text-xs text-green-600 mt-1">Uploaded: {uploadedFileName}</div>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Active</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={editActive ? 'true' : 'false'}
                onChange={e => setEditActive(e.target.value === 'true')}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                if (!editSubCategory) return;
                try {
                  setLoading(true);
                  await updateSubCategory(editSubCategory.id, {
                    name: editName,
                    description: editDescription,
                    imageUrl: editImageUrl,
                    categoryId: editSubCategory.categoryId,
                    active: editActive,
                  });
                  setSubcategories(subcategories => subcategories.map(s =>
                    s.id === editSubCategory.id
                      ? { ...s, name: editName, description: editDescription, imageUrl: editImageUrl, active: editActive }
                      : s
                  ));
                  setEditDialogOpen(false);
                } catch (err: any) {
                  alert(err?.response?.data?.message || err.message || 'Failed to update subcategory');
                } finally {
                  setLoading(false);
                }
              }}
              className="bg-saas-blue hover:bg-saas-blue/90 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => {
                                  setDeleteTarget(subCategory);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash className="h-4 w-4 mr-1" /> Delete
                              </Button>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Subcategory</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to delete <span className="font-semibold">{deleteTarget?.name}</span>?</div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deleteTarget) return;
                try {
                  setLoading(true);
                  await deleteSubCategory(deleteTarget.id);
                  setSubcategories(subcategories => subcategories.filter(s => s.id !== deleteTarget.id));
                  setDeleteDialogOpen(false);
                  setDeleteTarget(null);
                } catch (err: any) {
                  alert(err?.response?.data?.message || err.message || 'Failed to delete subcategory');
                } finally {
                  setLoading(false);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Delete
            </Button>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-10">
                          No subcategories found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewSubCategories;
