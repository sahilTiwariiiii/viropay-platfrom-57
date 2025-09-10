import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { getFieldsBySubcategory, addField, deleteField } from '@/api/fields';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';



const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'image', label: 'Image' },
  { value: 'radio', label: 'Radio' },
  // { value: 'dropdown', label: 'Dropdown' }, // Removed as requested
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'textarea', label: 'Textarea' },
];


const FieldsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const subcategoryId = searchParams.get('subcategoryId') || '';
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      type: 'text',
      required: false,
      options: '',
      description: '',
      displayOrder: 1,
    },
  });

  // Fetch fields from API
  const fetchFields = async () => {
    if (!subcategoryId) return;
    setLoading(true);
    try {
      const data = await getFieldsBySubcategory(subcategoryId);
      // If API returns an array directly, use it. If wrapped in {fields: [...]}, use that.
      setFields(Array.isArray(data) ? data : data.fields || []);
    } catch (err) {
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
    // eslint-disable-next-line
  }, [subcategoryId]);

  // Clear options field if type is not radio/dropdown
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'type' && value.type !== 'radio' && value.type !== 'dropdown') {
        form.setValue('options', '');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);


  const handleAddField = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const onSubmit = async (data: any) => {
    if (!subcategoryId) return;
    // Capitalize type for enum compliance
    const typeEnum = (data.type || '').toUpperCase();
    let options: string | null = null;
    if ((typeEnum === 'RADIO' || typeEnum === 'DROPDOWN' || typeEnum === 'MULTIPLE_CHOICE') && data.options) {
      const arr = data.options.split(',').map((opt: string) => opt.trim()).filter(Boolean);
      options = JSON.stringify(arr);
    }
    // Default displayOrder to last+1
    const displayOrder = fields.length + 1;
    const payload = {
      name: data.name,
      type: typeEnum,
      required: data.required,
      options,
      description: data.description,
      subcategoryId: Number(subcategoryId),
      displayOrder,
      active: true,
      validationRules: '{}',
    };
    try {
      await addField(payload);
      setOpen(false);
      form.reset();
      fetchFields();
    } catch (err) {
      // handle error (show toast, etc.)
    }
  };


  const handleEditField = (id: string) => {
    // Implement edit field logic or navigation
    alert(`Edit field ${id} (to be implemented)`);
  };

  const handleDeleteField = async (id: string) => {
    try {
      await deleteField(id);
      fetchFields();
    } catch (err) {
      // handle error (show toast, etc.)
    }
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
              <h2 className="text-xl font-semibold">Fields for <span className="text-saas-blue">{subcategory}</span></h2>
              <Button onClick={handleAddField} className="bg-saas-blue hover:bg-saas-blue/90">
                <Plus className="mr-2 h-4 w-4" /> Add Field
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                  className="w-full max-w-md p-2 bg-white rounded-lg shadow-lg border border-gray-100 flex flex-col justify-center items-center"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'fixed',
                    zIndex: 50,
                    maxHeight: '95vh',
                    minHeight: 'auto',
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Add New Field</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 w-full text-xs">
                      <FormField name="name" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Field Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter field name"
                              {...field}
                              required
                              className="rounded border-gray-300 focus:ring-saas-blue focus:border-saas-blue focus:outline-none px-2 py-1 text-xs"
                              style={{ boxShadow: 'none' }}
                              onChange={e => {
                                const formatted = e.target.value.toLowerCase().replace(/\s+/g, '-');
                                field.onChange(formatted);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField name="type" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Field Type</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="rounded border-gray-300 focus:ring-saas-blue px-2 py-1 text-xs" >
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {FIELD_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField name="required" control={form.control} render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-1">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="scale-90" />
                          </FormControl>
                          <FormLabel className="text-xs font-medium">Required</FormLabel>
                        </FormItem>
                      )} />
                      <FormField name="options" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Options (comma separated)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Option1, Option2, Option3"
                              {...field}
                              value={field.value || ''}
                              onChange={field.onChange}
                              disabled={!(form.watch('type') === 'radio' || form.watch('type') === 'dropdown')}
                              className="rounded border-gray-300 focus:ring-saas-blue focus:border-saas-blue focus:outline-none px-2 py-1 text-xs bg-gray-50 disabled:bg-gray-100"
                              style={{ boxShadow: 'none' }}
                            />
                          </FormControl>
                          <FormDescription>Only for radio/dropdown fields</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                      {fields.length > 0 && isEdit && (
                        <FormField name="displayOrder" control={form.control} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium">Display Order</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} placeholder="Display order (e.g. 1)" {...field} className="rounded border-gray-300 focus:ring-saas-blue focus:border-saas-blue focus:outline-none px-2 py-1 text-xs bg-gray-50" style={{ boxShadow: 'none' }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}
                      <FormField name="description" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Field description (optional)" {...field} className="rounded border-gray-300 focus:ring-saas-blue px-2 py-1 text-xs bg-gray-50" rows={2} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <DialogFooter className="flex flex-row justify-end gap-2 mt-2">
                        <Button type="submit" className="bg-saas-blue hover:bg-saas-blue/90 px-4 py-1.5 rounded text-xs font-semibold shadow">Add Field</Button>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="px-4 py-1.5 rounded text-xs font-semibold shadow">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell><div className="h-6 bg-gray-200 rounded w-3/4" /></TableCell>
                        <TableCell><div className="h-6 bg-gray-200 rounded w-1/2" /></TableCell>
                        <TableCell><div className="h-6 bg-gray-200 rounded w-1/2" /></TableCell>
                        <TableCell><div className="h-6 bg-gray-200 rounded w-2/3" /></TableCell>
                        <TableCell><div className="h-6 bg-gray-200 rounded w-1/2" /></TableCell>
                      </TableRow>
                    ))
                  ) : fields.length > 0 ? (
                    fields.map((field: any) => (
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
                          {Array.isArray(field.options) && field.options.length > 0 ? (
                            <span className="text-xs text-gray-700">{field.options.join(', ')}</span>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
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
                      <TableCell colSpan={5} className="text-center py-10">No fields found for this subcategory.</TableCell>
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
