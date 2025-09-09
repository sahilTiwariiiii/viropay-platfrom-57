import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, Laptop, Users, DollarSign, Clock, User, Tag, Image, Upload } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(2, "Application name must be at least 2 characters"),
  logo: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  owner: z.string().optional(),
  users: z.coerce.number().int().min(0, "Number of users must be a positive number"),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  currency: z.string().default("EUR"),
  paymentFrequency: z.string().min(1, "Please select a payment frequency"),
  lastPaymentDate: z.date(),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  "Email Marketing",
  "Scheduling",
  "Project Management",
  "CRM",
  "Issue Tracking",
  "Authentication",
  "Communication",
  "Forms",
  "Whiteboarding",
  "Design",
  "Productivity",
  "Development",
  "AI",
  "Analytics",
  "Marketing",
  "Software",
  "Other"
];

const frequencies = [
  "Monthly",
  "Yearly",
  "Quarterly",
  "Weekly",
  "One-time"
];

const currencies = [
  { value: "EUR", label: "EUR (€)" },
  { value: "USD", label: "USD ($)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
];

const AddApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
      category: "",
      description: "",
      owner: "",
      users: 0,
      amount: 0,
      currency: "EUR",
      paymentFrequency: "Monthly",
      lastPaymentDate: new Date(),
      isActive: true,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);
    
    // Convert isActive to status for compatibility with existing application structure
    const newApplication = {
      ...data,
      status: data.isActive ? 'active' : 'archived',
      createdAt: new Date(),
    };
    console.log(newApplication);
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success toast
    toast({
      title: "Application added",
      description: `${data.name} has been added to your applications.`,
    });
    
    // Navigate back to the applications page
    navigate("/applications");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Add Category Manually"
        subtitle="Add a new Category"
        showBackButton={true}
      />
      
      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">

                  {/* Application Name */}
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
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 mb-1">
                        <Image className="h-4 w-4 text-muted-foreground" />
                        <span>Application Image</span>
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
                                  form.setValue('logo', '');
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
                            id="logo-upload"
                            onChange={handleImageUpload}
                          />
                          <label htmlFor="logo-upload">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => document.getElementById('logo-upload')?.click()}
                            >
                              {imagePreview ? 'Replace' : 'Select File'}
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
                    name="isActive"
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
                            <label htmlFor="isActive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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

export default AddApplication;
