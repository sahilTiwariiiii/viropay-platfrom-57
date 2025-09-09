import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { generateMockSubCategories, SubCategory } from '@/features/subcategories/utils/generateSubCategoriesData';
import { Plus, Pencil, Trash, ExternalLink } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const CategoryView = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');

	// Get all categories
	const allCategories = generateMockSubCategories();
	const filteredCategories = category
		? allCategories.filter(sub => sub.category === category)
		: allCategories;

	// Handler for add category button
	const handleAddCategory = () => {
		navigate('/category/add');
	};

	// Handler for view categories in new tab
	const handleViewCategories = (category: string) => {
		navigate(`/subcategories?category=${encodeURIComponent(category)}`);
	};

	return (
		<div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
			<Header
				title={category ? `${category} Categories` : "All Categories"}
				subtitle="View and manage categories"
				showBackButton={true}
				onBackClick={() => navigate(-1)}
			/>
			<main className="flex-1 overflow-y-auto p-6 animate-fade-in">
				<Card className="max-w-5xl mx-auto mb-8">
					<CardContent className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold">
							{category ? `${category} Categories` : "All Categories"}
						</h2>
							<Button onClick={handleAddCategory} className="bg-saas-blue hover:bg-saas-blue/90">
								<Plus className="mr-2 h-4 w-4" /> Add Category
							</Button>
						</div>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
								<TableRow className="bg-gray-50 hover:bg-gray-50">
									<TableHead>Category</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Count</TableHead>
									<TableHead className="w-[80px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
								<TableBody>
									{filteredCategories.length > 0 ? (
									filteredCategories.map((category: SubCategory) => (
											<TableRow key={category.id} className="hover:bg-gray-50">
												<TableCell>
										<span className="font-medium">{category.category}</span>
									</TableCell>
												<TableCell>
													<span className="text-sm text-gray-700">{category.description}</span>
												</TableCell>
												<TableCell>
													<span className="text-sm text-gray-600">{category.count}</span>
												</TableCell>
												<TableCell>
													<div className="flex gap-2">
														<Button 
															variant="outline" 
															size="sm"
															onClick={() => handleViewCategories(category.category)}
														>
															<ExternalLink className="h-4 w-4 mr-1" /> Open
														</Button>
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
												{category ? `No categories found for ${category}` : "No categories found."}
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

export default CategoryView;
    