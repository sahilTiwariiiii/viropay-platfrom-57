import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { uploadFile } from '@/api/uploadFile';
import { addCategory } from '@/api/addCategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Laptop, Tag, Image, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const AddCategory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      description: '',
      active: true,
    },
  });

  // Keep preview in sync with form value
  const imageUrl = form.watch("imageUrl");

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange?: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setImageFileName(file.name);
      try {
        const url = await uploadFile(file);
        console.log(url ,"checking url")
        form.setValue('imageUrl', url, { shouldValidate: true, shouldDirty: true });
        if (onChange) onChange(url);
        setTimeout(() => {
          console.log('Image URL in form after upload:', form.getValues('imageUrl'));
        }, 100);
      } catch (err: any) {
        toast({ title: 'Image upload failed', description: err.message, variant: 'destructive' });
        setImageFileName(null);
      } finally {
        setUploading(false);
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Form data:", data);
    console.log('Submitting category imageUrl:', data.imageUrl);

    try {
      await addCategory({
        name: data.name,
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        active: data.active,
      });
      toast({
        title: "Category added",
        description: `${data.name} has been added to your categories.`,
      });
      navigate('/categories');
    } catch (err: any) {
      toast({
        title: 'Failed to add category',
        description: err.response?.data?.message || err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Add Category"
        subtitle="Add a new Category"
        showBackButton={true}
        onBackClick={() => navigate('/categories')}
      />

      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">

                  {/* Category Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Laptop className="h-4 w-4 text-muted-foreground" />
                            <span>Name</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter category name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload */}
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Image className="h-4 w-4 text-muted-foreground" />
                            <span>Category Image</span>
                          </div>
                        </FormLabel>
                        <div className="flex items-center gap-4">
                          <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full">
                            <div className="flex flex-col items-center justify-center gap-2">
                              {imageUrl ? (
                                <div className="relative w-24 h-24 mb-2">
                                  <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-md"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                    onClick={() => {
                                      form.setValue('imageUrl', '', { shouldDirty: true });
                                      setImageFileName(null);
                                    }}
                                    disabled={uploading}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ) : (
                                <Upload className="h-10 w-10 text-gray-400" />
                              )}
                              {imageFileName && (
                                <div className="text-xs text-gray-700 mt-1">{imageFileName}</div>
                              )}
                              <div className="text-center">
                                <p className="text-sm font-medium">
                                  {imageUrl ? 'Change image' : 'Upload an image'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PNG, JPG or SVG (max. 2MB)
                                </p>
                              </div>
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="image-upload"
                                onChange={e => handleImageUpload(e, field.onChange)}
                                disabled={uploading}
                              />
                              <label htmlFor="image-upload">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => document.getElementById('image-upload')?.click()}
                                  disabled={uploading}
                                >
                                  {uploading ? 'Uploading...' : (imageUrl ? 'Replace' : 'Select File')}
                                </Button>
                              </label>
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span>Description</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the category"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Active/Inactive */}
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="active"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Active
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/categories')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-saas-blue hover:bg-saas-blue/90">
                    Add Category
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddCategory;
