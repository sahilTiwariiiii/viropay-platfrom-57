import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Edit, Trash2, Plus, Settings, Tag, CheckCircle, Clock, Image as ImageIcon } from 'lucide-react';
import { getFieldsBySubcategory, addField, deleteField, updateField } from '@/api/fields';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { getFieldById } from '@/api/fieldSingle';

const FIELD_TYPES = [
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'number', label: 'Number', icon: '🔢' },
  { value: 'date', label: 'Date', icon: '📅' },
  { value: 'image', label: 'Image', icon: '🖼️' },
  { value: 'radio', label: 'Radio', icon: '📻' },
  { value: 'checkbox', label: 'Checkbox', icon: '☑️' },
  { value: 'textarea', label: 'Textarea', icon: '📄' },
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
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

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

  // Enhanced option state to handle objects with name and image
  const [optionItems, setOptionItems] = useState<Array<{name: string, image: string}>>([]);
  const [currentOption, setCurrentOption] = useState({name: '', image: ''});

  // Fetch fields from API
  const fetchFields = async () => {
    if (!subcategoryId) return;
    setLoading(true);
    try {
      const data = await getFieldsBySubcategory(subcategoryId);
      setFields(Array.isArray(data) ? data : (data as any)?.fields || []);
    } catch (err) {
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, [subcategoryId]);

  // Clear options field if type is not radio/dropdown
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'type' && value.type !== 'radio' && value.type !== 'checkbox') {
        setOptionItems([]);
        form.setValue('options', '');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Keep form.options in sync with optionItems
  useEffect(() => {
    if (form.watch('type') === 'radio' || form.watch('type') === 'checkbox') {
      form.setValue('options', JSON.stringify(optionItems));
    }
  }, [optionItems]);

  const handleAddField = () => {
    setIsEdit(false);
    setOptionItems([]);
    setCurrentOption({name: '', image: ''});
    form.reset({
      name: '',
      type: 'text',
      required: false,
      options: '',
      description: '',
      displayOrder: 1,
    });
    setOpen(true);
  };

  const handleEditField = async (id: string) => {
    setIsEdit(true);
    setEditingFieldId(id);
    try {
      const data = await getFieldById(id);
      let parsedOptions: Array<{name: string, image: string}> = [];
      
      if (data.options) {
        try {
          const parsed = JSON.parse(data.options);
          if (Array.isArray(parsed)) {
            // Check if it's the new format (array of objects)
            if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0].name !== undefined) {
              parsedOptions = parsed;
            } else {
              // Convert old format (array of strings) to new format
              parsedOptions = parsed.map((opt: string) => ({name: opt, image: ''}));
            }
          }
        } catch {
          parsedOptions = [];
        }
      }

      form.reset({
        name: data.name || '',
        type: (data.type || '').toLowerCase() || 'text',
        required: !!data.required,
        options: JSON.stringify(parsedOptions),
        description: data.description || '',
        displayOrder: data.displayOrder || 1,
      });
      
      setOptionItems(parsedOptions);
      setCurrentOption({name: '', image: ''});
      setOpen(true);
    } catch (err) {
      console.error('Error loading field:', err);
    }
  };

  const handleAddOption = () => {
    if (currentOption.name.trim()) {
      const newOption = {
        name: currentOption.name.trim(),
        image: currentOption.image.trim() || ''
      };
      
      // Check if option name already exists
      if (!optionItems.some(item => item.name === newOption.name)) {
        setOptionItems([...optionItems, newOption]);
        setCurrentOption({name: '', image: ''});
      }
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptionItems(optionItems.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (!subcategoryId) return;
    
    let typeEnum = (data.type || '').toUpperCase();
    if (typeEnum === 'IMAGE') typeEnum = 'FILE';
    if (typeEnum === 'CHECKBOX') typeEnum = 'MULTIPLE_CHOICE';
    
    let options: string | null = null;
 if (typeEnum === 'RADIO' || typeEnum === 'DROPDOWN' || typeEnum === 'MULTIPLE_CHOICE') {
  // Only include options with non-empty name, and always include image property
  options = JSON.stringify(
    optionItems
      .filter(item => item.name.trim())
      .map(item => ({
        name: item.name.trim(),
        image: item.image ? item.image.trim() : ''
      }))
  );
}
    // console.log('Submitting field with options:', options);
// return

    let payload = {
      name: data.name,
      type: typeEnum,
      required: data.required,
      options,
      description: data.description,
      subcategoryId: Number(subcategoryId),
      displayOrder: isEdit ? Number(data.displayOrder) : fields.length + 1,
      active: true,
      validationRules: '{}',
    };
    
    try {
      if (isEdit && editingFieldId) {
        await updateField(editingFieldId, payload);
      } else {
        await addField(payload);
      }
      setOpen(false);
      form.reset();
      setOptionItems([]);
      setCurrentOption({name: '', image: ''});
      fetchFields();
      setEditingFieldId(null);
      setIsEdit(false);
    } catch (err) {
      console.error('Error saving field:', err);
    }
  };

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetName, setDeleteTargetName] = useState<string | null>(null);

  const handleDeleteField = async (id: string) => {
    setDeleteTargetId(id);
    const field = fields.find(f => f.id === id);
    setDeleteTargetName(field ? field.label || field.name || '' : '');
    setDeleteDialogOpen(true);
  };

  const confirmDeleteField = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteField(deleteTargetId);
      fetchFields();
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);
    } catch (err) {
      console.error('Error deleting field:', err);
    }
  };

  const getTypeIcon = (type: string) => {
    const fieldType = FIELD_TYPES.find(ft => ft.value === type.toLowerCase());
    return fieldType?.icon || '📝';
  };

  const renderOptionsDisplay = (field: any) => {
    let opts = field.options;
    if (typeof opts === 'string') {
      try { 
        opts = JSON.parse(opts); 
      } catch { 
        opts = []; 
      }
    }
    
    if (Array.isArray(opts) && opts.length > 0) {
      // Check if it's the new format (objects) or old format (strings)
      const isNewFormat = opts.length > 0 && typeof opts[0] === 'object' && opts[0].name !== undefined;
      
      return (
        <div className="flex flex-wrap gap-1 max-w-[150px] sm:max-w-xs">
          {opts.slice(0, 1  ).map((opt: any, idx: number) => (
            <div key={idx} className="flex items-center">
              <Badge variant="outline" className="text-xs bg-accent/50 text-accent-foreground border-accent flex items-center gap-1">
                {isNewFormat ? opt.name : opt}
                {isNewFormat && opt.image && (
                  <ImageIcon className="w-3 h-3 text-muted-foreground" />
                )}
              </Badge>
            </div>
          ))}
          {opts.length > 1 && (
            <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground">
              +{opts.length - 1} more
            </Badge>
          )}
        </div>
      );
    }
    
    return <span className="text-xs text-muted-foreground">No options</span>;
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent shadow-lg transition-all duration-300">
      <Header
        title={`Fields for ${subcategory}`}
        subtitle={`Manage fields for ${category} / ${subcategory}`}
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />
      
      <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 animate-fade-in">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-8 px-1 sm:px-2 md:px-4">
          {loading ? (
            <div className="card-gradient rounded-2xl p-4 sm:p-6 md:p-8 hover-lift">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-xl shimmer" style={{minWidth: '40px', minHeight: '40px'}} />
                  <div>
                    <div className="h-6 sm:h-8 w-32 sm:w-48 rounded shimmer mb-2" />
                    <div className="h-4 w-40 sm:w-64 rounded shimmer" />
                  </div>
                </div>
                <div className="w-full sm:w-auto flex items-center">
                  <div className="h-10 w-full sm:w-40 rounded shimmer" />
                </div>
              </div>
            </div>
          ) : (
            <div className="card-gradient rounded-2xl p-4 sm:p-6 md:p-8 hover-lift">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-xl">
                    <Settings className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Fields Configuration
                    </h1>
                    <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                      Manage form fields for <span className="font-semibold text-primary">{subcategory}</span>
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleAddField} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 btn-primary-glow text-primary-foreground border-0 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" /> 
                  Add New Field
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-1 sm:px-2 ">
          {loading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <Card className="card-gradient hover-lift " key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-4 w-24 rounded shimmer mb-2" />
                        <div className="h-7 w-12 rounded shimmer" />
                      </div>
                      <div className="h-8 w-8 rounded-xl shimmer" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <Card className="card-gradient  hover-lift">
                <CardContent className="p-4 ">
                  <div className="flex items-center  justify-between">
                    <div>
                      <p className=" text-sm font-medium text-muted-foreground ">Total Fields</p>
                      <p className="text-2xl font-bold text-primary">{fields.length}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Required Fields</p>
                      <p className="text-2xl font-bold text-primary">
                        {fields.filter(f => f.required).length}
                      </p>
                    </div>
                    <div className="bg-success/10 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Field Types</p>
                      <p className="text-2xl font-bold text-primary">
                        {new Set(fields.map(f => f.type)).size}
                      </p>
                    </div>
                    <div className="bg-warning/10 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Table */}
        <Card className="max-w-7xl mx-auto card-gradient animate-slide-up px-1 sm:px-2 md:px-4">
          <CardContent className="p-0">
            <div className="p-3 sm:p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold flex items-center">
                <Settings className="mr-2 h-5 w-5 text-primary" />
                Field Management
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Configure and organize your form fields
              </p>
            </div>
            
            <div className="overflow-x-auto w-full">
              <Table className="min-w-[600px] sm:min-w-0">
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="font-semibold text-foreground/80 whitespace-nowrap">Field Name</TableHead>
                    <TableHead className="font-semibold text-foreground/80 whitespace-nowrap">Type</TableHead>
                    <TableHead className="font-semibold text-foreground/80 whitespace-nowrap">Required</TableHead>
                    <TableHead className="font-semibold text-foreground/80 whitespace-nowrap">Options</TableHead>
                    <TableHead className="text-center font-semibold text-foreground/80 whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i} className="table-row-hover">
                        <TableCell colSpan={5} className="py-6">
                          <div className="flex items-center gap-3 animate-pulse">
                            <div className="h-8 w-8 rounded-full bg-gray-200 shimmer" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-2/3 bg-gray-200 rounded shimmer" />
                              <div className="h-3 w-1/2 bg-gray-200 rounded shimmer" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : fields.length > 0 ? (
                    fields.map((field: any, index) => (
                      <TableRow key={field.id} className="table-row-hover border-border/30" style={{animationDelay: `${index * 0.1}s`}}>
                        <TableCell>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-lg">{getTypeIcon(field.type)}</span>
                            <div>
                              <span className="font-medium text-foreground break-all">{field.name}</span>
                              {field.description && (
                                <p className="text-xs text-muted-foreground mt-1 max-w-[120px] sm:max-w-[200px] truncate">
                                  {field.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-medium">
                            {field.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {field.required ? (
                            <Badge className="text-xs px-3 py-1 font-semibold border-0 text-white" style={{background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'}}>
                              <CheckCircle className="w-3 h-3 mr-1 text-white" />
                              Required
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground">
                              Optional
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {renderOptionsDisplay(field)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditField(field.id)}
                              className="hover-lift border-primary/20 hover:border-primary/40 hover:bg-primary/5 w-full sm:w-auto"
                            >
                              <Edit className="h-4 w-4 mr-1 text-primary" /> 
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="hover-lift border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 text-destructive w-full sm:w-auto" 
                              onClick={() => handleDeleteField(field.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> 
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="bg-muted/20 p-4 rounded-full">
                            <Settings className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">No fields configured yet</p>
                            <p className="text-sm text-muted-foreground">Get started by adding your first field</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
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
              @media (max-width: 640px) {
                .card-gradient, .card-gradient > * { border-radius: 1rem !important; }
              }
            `}</style>
          </CardContent>
        </Card>

        {/* Enhanced Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent 
            className="dialog-content-enhanced w-full max-w-lg animate-scale-in"
            style={{
              maxHeight: '90vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              .dialog-content-enhanced::-webkit-scrollbar { display: none; }
            `}</style>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-xl font-semibold flex items-center">
                <Plus className="mr-2 h-5 w-5 text-primary" />
                {isEdit ? 'Edit' : 'Add New'} Field
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 w-full">
            
                <FormField name="description" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Field Name <span className="text-muted-foreground">(visible to client)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter field Name or instructions for users..." 
                        {...field} 
                        className="rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-accent/20 resize-none" 
                        rows={3} 
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      This helps users understand what information to provide
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="type" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Field Type</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/50">
                          {FIELD_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value} className="hover:bg-accent">
                              <div className="flex items-center">
                                <span className="mr-2">{type.icon}</span>
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="required" control={form.control} render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border border-border/50 rounded-lg bg-accent/30">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                        className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-foreground">
                        Mark as Required Field
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Users must fill this field to submit the form
                      </p>
                    </div>
                  </FormItem>
                )} />

                {(form.watch('type') === 'radio' || form.watch('type') === 'checkbox') && (
                  <FormField name="options" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Options with Images
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {/* Add new option form */}
                          <div className="border border-border/50 rounded-lg p-4 bg-accent/20">
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">
                                  Option Name *
                                </label>
                                <Input
                                  placeholder="Enter option name"
                                  value={currentOption.name}
                                  onChange={(e) => setCurrentOption({...currentOption, name: e.target.value})}
                                  className="rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">
                                  Image URL <span className="text-muted-foreground">(optional)</span>
                                </label>
                                <Input
                                  placeholder="https://example.com/image.png"
                                  value={currentOption.image}
                                  onChange={(e) => setCurrentOption({...currentOption, image: e.target.value})}
                                  className="rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <Button
                                type="button"
                                onClick={handleAddOption}
                                disabled={!currentOption.name.trim()}
                                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 w-full"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Option
                              </Button>
                            </div>
                          </div>

                          {/* Display added options */}
                          {optionItems.length > 0 && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">
                                Added Options ({optionItems.length})
                              </label>
                              <div className="max-h-40 overflow-y-auto space-y-2 border border-border/50 rounded-lg p-3 bg-accent/10">
                                {optionItems.map((option, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/30">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm text-foreground truncate">
                                          {option.name}
                                        </div>
                                        {option.image && (
                                          <div className="flex items-center space-x-2 mt-1">
                                            <ImageIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                            <span className="text-xs text-muted-foreground truncate">
                                              {option.image}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                      {option.image && (
                                        <div className="flex-shrink-0">
                                          <img
                                            src={option.image}
                                            alt={option.name}
                                            className="w-8 h-8 object-cover rounded border"
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRemoveOption(idx)}
                                      className="ml-2 flex-shrink-0 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 text-destructive"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Add options with optional images. Each option becomes a selectable choice for this field.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                {fields.length > 0 && isEdit && (
                  <FormField name="displayOrder" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          placeholder="Display order (e.g. 1) so this field appears in first place" 
                          {...field} 
                          className="rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-accent/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}



                    <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Key Name <span className="text-muted-foreground">(For Internal Use)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Key name or You can copy from Field Name"
                        {...field}
                        required
                        className="rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        onChange={e => {
                          const formatted = e.target.value.toLowerCase().replace(/\s+/g, '-');
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <DialogFooter className="flex flex-row justify-end gap-3 pt-4 border-t border-border/50">
                  <DialogClose asChild>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="px-6 py-2 border-border/50 hover:bg-accent/50"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 btn-primary-glow text-primary-foreground px-6 py-2"
                  >
                    {isEdit ? 'Update' : 'Create'} Field
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Field</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete <span className="font-semibold">{deleteTargetName}</span>?
              This action cannot be undone.
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteField}
                className="bg-red-600 hover:bg-red-700"
              >
                Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default FieldsView;