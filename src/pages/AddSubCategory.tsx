
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Laptop, Tag, Image, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadFile } from '@/api/uploadFile';
import api from '@/api';
import { getCategories, Category } from '@/api/categories';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// No static categories, will fetch dynamically

const formSchema = z.object({
    name: z.string().min(2, "Subcategory name must be at least 2 characters"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    active: z.boolean().default(true),
});
type FormValues = z.infer<typeof formSchema>;

const AddSubCategory = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const categoryName = searchParams.get('categoryName');

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
            description: '',
            active: true,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadingImage(true);
            try {
                const url = await uploadFile(file);
                form.setValue('imageUrl', url.url || url);
                setImagePreview(url.url || url);
            } catch {
                toast({ title: 'Image upload failed', description: 'Please try again', variant: 'destructive' });
            } finally {
                setUploadingImage(false);
            }
        }
    };

    const onSubmit = async (data: FormValues) => {
        if (!categoryId) {
            toast({ title: 'No category selected', description: 'Cannot create subcategory without a parent category', variant: 'destructive' });
            return;
        }
        try {
            await api.post('/api/v1/subcategories', {
                name: data.name,
                description: data.description,
                imageUrl: data.imageUrl,
                categoryId: Number(categoryId),
                active: data.active,
            });
            toast({ title: 'Subcategory added', description: `${data.name} has been added.` });
            navigate(`/subcategories?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName || '')}`);
        } catch {
            toast({ title: 'Failed to add subcategory', description: 'Please try again', variant: 'destructive' });
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            <Header
                title={`Add Subcategory to ${categoryName || ''}`}
                subtitle={categoryName ? `Create a new subcategory under ${categoryName}` : 'Add a new Subcategory'}
                showBackButton={true}
            />
            <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 animate-fade-in">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardContent className="p-2 sm:p-4 md:p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                                <div className="grid grid-cols-1 gap-4 sm:gap-6">


                                                        {/* Name */}
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
                                                                        <Input placeholder="Enter name" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                    {/* Image Upload */}
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Image className="h-4 w-4 text-muted-foreground" />
                                                <span>Subcategory Image</span>
                                            </div>
                                        </FormLabel>
                                        <div className="flex items-center gap-4">
                                            <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    {imagePreview ? (
                                                        <div className="relative w-24 h-24 mb-2">
                                                            <img 
                                                                src={imagePreview} 
                                                                alt="Preview" 
                                                                className="w-full h-full object-contain rounded-md"
                                                            />
                                                            <Button 
                                                                type="button" 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                                onClick={() => {
                                                                    setImagePreview(null);
                                                                    form.setValue('imageUrl', '');
                                                                }}
                                                            >
                                                                ×
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Upload className="h-10 w-10 text-gray-400" />
                                                    )}
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium">
                                                            {imagePreview ? 'Change image' : 'Upload an image'}
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
                                                        onChange={handleImageUpload}
                                                        disabled={uploadingImage}
                                                    />
                                                    <label htmlFor="image-upload">
                                                        <Button 
                                                            type="button" 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="mt-2"
                                                            disabled={uploadingImage}
                                                            onClick={() => document.getElementById('image-upload')?.click()}
                                                        >
                                                            {uploadingImage ? 'Uploading...' : (imagePreview ? 'Replace' : 'Select File')}
                                                        </Button>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </FormItem>

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
                                                        placeholder="Brief description of the subcategory" 
                                                        className="resize-none" 
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Show parent category info */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Parent Category:</span>
                                            <span>{categoryName || ''}</span>
                                        </div>
                                    </div>

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
                                                        <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-saas-blue hover:bg-saas-blue/90">
                                        Add Subcategory
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

export default AddSubCategory;