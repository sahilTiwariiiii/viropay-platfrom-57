import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, Laptop, Users, DollarSign, Clock, User, Tag } from 'lucide-react';
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
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);
    
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
        title="Add Application Manually"
        subtitle="Add a new SaaS application to your inventory"
        showBackButton={true}
      />
      
      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Laptop className="h-4 w-4 text-muted-foreground" />
                            <span>Application Name</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Slack, Notion, Figma..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span>Category</span>
                          </div>
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Owner</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Who is responsible for this app?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What is this application used for?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="users"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Number of Users</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Payment Frequency</span>
                          </div>
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frequencies.map((frequency) => (
                              <SelectItem key={frequency} value={frequency}>
                                {frequency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>Amount</span>
                          </div>
                        </FormLabel>
                        <div className="flex">
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormField
                            control={form.control}
                            name="currency"
                            render={({ field: currencyField }) => (
                              <Select 
                                onValueChange={currencyField.onChange} 
                                defaultValue={currencyField.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-24 ml-2">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {currencies.map((currency) => (
                                    <SelectItem key={currency.value} value={currency.value}>
                                      {currency.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastPaymentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Last Payment Date</span>
                          </div>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
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
                    Add Application
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
