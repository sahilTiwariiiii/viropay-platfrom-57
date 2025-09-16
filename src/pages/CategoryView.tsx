import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import { getCategories, Category } from '@/api/categories';
import { updateCategory } from '@/api/updateCategory';
import { deleteCategory } from '@/api/deleteCategory';

import { Plus, Pencil, Trash, ExternalLink, Search, Filter, Grid, List, Eye, Archive, Sparkles } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const CategoryView = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<Category[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [editId, setEditId] = useState<number | null>(null);
	const [editName, setEditName] = useState('');
	const [editDescription, setEditDescription] = useState('');
	const [editLoading, setEditLoading] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

	const fetchCategories = async () => {
		setLoading(true);
		setError('');
		try {
			const data = await getCategories();
			setCategories(data);
			setFilteredCategories(data);
		} catch (err: any) {
			setError(err.response?.data?.message || err.message || 'Failed to load categories');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		const filtered = categories.filter(category =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredCategories(filtered);
	}, [searchTerm, categories]);

	const handleAddCategory = () => {
		navigate('/category/add');
	};

	const handleViewCategories = (categoryId: number, categoryName: string) => {
		navigate(`/subcategories?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
	};

	const handleEdit = (category: Category) => {
		setEditId(category.id);
		setEditName(category.name);
		setEditDescription(category.description);
	};

	const handleEditSave = async () => {
		if (!editId) return;
		setEditLoading(true);
		try {
			await updateCategory(editId, { name: editName, description: editDescription });
			setEditId(null);
			setEditName('');
			setEditDescription('');
			fetchCategories();
		} catch (err: any) {
			alert(err.response?.data?.message || err.message || 'Failed to update category');
		} finally {
			setEditLoading(false);
		}
	};

	const handleEditCancel = () => {
		setEditId(null);
		setEditName('');
		setEditDescription('');
	};

	const handleDelete = (category: Category) => {
		setCategoryToDelete(category);
		setDeleteDialogOpen(true);
	};

	const confirmDelete = async () => {
		if (!categoryToDelete) return;
		setLoading(true);
		try {
			await deleteCategory(categoryToDelete.id);
			fetchCategories();
			setDeleteDialogOpen(false);
			setCategoryToDelete(null);
		} catch (err: any) {
			alert(err.response?.data?.message || err.message || 'Failed to delete category');
		} finally {
			setLoading(false);
		}
	};

	const renderGridView = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
			{filteredCategories.map((category, index) => (
				<Card 
					key={category.id} 
					className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50"
					style={{ animationDelay: `${index * 100}ms` }}
				>
					<CardContent className="p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-2">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
									<Sparkles className="w-5 h-5 text-white" />
								</div>
								<Badge 
									variant="secondary" 
									className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0"
								>
									Category
								</Badge>
							</div>
						</div>
						
						{editId === category.id ? (
							<div className="space-y-3">
								<input
									className="w-full border-2 border-blue-200 focus:border-blue-500 px-3 py-2 rounded-lg transition-colors"
									value={editName}
									onChange={e => setEditName(e.target.value)}
									disabled={editLoading}
									placeholder="Category name"
								/>
								<textarea
									className="w-full border-2 border-blue-200 focus:border-blue-500 px-3 py-2 rounded-lg transition-colors resize-none"
									value={editDescription}
									onChange={e => setEditDescription(e.target.value)}
									disabled={editLoading}
									placeholder="Category description"
									rows={3}
								/>
								<div className="flex gap-2">
									<Button
										size="sm"
										onClick={handleEditSave}
										disabled={editLoading}
										className="bg-green-500 hover:bg-green-600 flex-1"
									>
										Save
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={handleEditCancel}
										disabled={editLoading}
										className="flex-1"
									>
										Cancel
									</Button>
								</div>
							</div>
						) : (
							<>
								<h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
									{category.name}
								</h3>
								<p className="text-gray-600 mb-4 line-clamp-2">
									{category.description}
								</p>
								
								<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleViewCategories(category.id, category.name)}
										className="flex-1 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
									>
										<Eye className="h-4 w-4 mr-1" /> View
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(category)}
										className="border-green-200 hover:bg-green-50 hover:border-green-300"
									>
										<Pencil className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
										onClick={() => handleDelete(category)}
									>
										<Trash className="h-4 w-4" />
									</Button>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);

	const renderTableView = () => (
		<div className="bg-white rounded-xl shadow-md overflow-hidden border-0">
			<Table>
				<TableHeader>
					<TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-50 hover:to-blue-50 border-b border-gray-200">
						<TableHead className="font-semibold text-gray-700">Category</TableHead>
						<TableHead className="font-semibold text-gray-700">Description</TableHead>
						<TableHead className="w-[200px] font-semibold text-gray-700">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredCategories.length > 0 ? (
						filteredCategories.map((category, index) => (
							<TableRow 
								key={category.id} 
								className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border-b border-gray-100 group"
								style={{ animationDelay: `${index * 50}ms` }}
							>
								<TableCell className="py-4">
									{editId === category.id ? (
										<input
											className="border-2 border-blue-200 focus:border-blue-500 px-3 py-2 rounded-lg w-full transition-colors"
											value={editName}
											onChange={e => setEditName(e.target.value)}
											disabled={editLoading}
										/>
									) : (
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
												<span className="text-white text-sm font-bold">
													{category.name.charAt(0).toUpperCase()}
												</span>
											</div>
											<span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
												{category.name}
											</span>
										</div>
									)}
								</TableCell>
								<TableCell className="py-4">
									{editId === category.id ? (
										<input
											className="border-2 border-blue-200 focus:border-blue-500 px-3 py-2 rounded-lg w-full transition-colors"
											value={editDescription}
											onChange={e => setEditDescription(e.target.value)}
											disabled={editLoading}
										/>
									) : (
										<span className="text-gray-600">{category.description}</span>
									)}
								</TableCell>
								<TableCell className="py-4">
									<div className="flex gap-2">
										{editId === category.id ? (
											<>
												<Button
													variant="outline"
													size="sm"
													onClick={handleEditSave}
													disabled={editLoading}
													className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
												>
													Save
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={handleEditCancel}
													disabled={editLoading}
													className="border-gray-200 hover:bg-gray-50"
												>
													Cancel
												</Button>
											</>
										) : (
											<>
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleViewCategories(category.id, category.name)}
													className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
												>
													<ExternalLink className="h-4 w-4 mr-1" /> Open
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleEdit(category)}
													className="border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
												>
													<Pencil className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="sm"
													className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
													onClick={() => handleDelete(category)}
													disabled={editId === category.id}
												>
													<Trash className="h-4 w-4" />
												</Button>
											</>
										)}
									</div>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={3} className="text-center py-16">
								<div className="flex flex-col items-center space-y-3">
									<Archive className="w-12 h-12 text-gray-400" />
									<span className="text-gray-500 text-lg">
										{searchTerm ? 'No categories match your search.' : 'No categories found.'}
									</span>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);

	return (
		<div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
			<Header
				title="All Categories"
				subtitle="View and manage categories"
				showBackButton={true}
				onBackClick={() => navigate(-1)}
			/>
			
			<main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
				<div className="w-full max-w-7xl mx-auto space-y-6">
					{/* Enhanced Header Section */}
					<Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6">
							<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
								<div>
									<h2 className="text-2xl font-bold text-gray-800 mb-2">
										Category Management
									</h2>
									
								</div>
								
								<div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
										<Input
											placeholder="Search categories..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-colors w-full sm:w-64"
										/>
									</div>
									
									<div className="flex gap-2">
										<Button
											variant={viewMode === 'table' ? 'default' : 'outline'}
											size="sm"
											onClick={() => setViewMode('table')}
											className="transition-all duration-200"
										>
											<List className="w-4 h-4 mr-1" /> Table
										</Button>
										<Button
											variant={viewMode === 'grid' ? 'default' : 'outline'}
											size="sm"
											onClick={() => setViewMode('grid')}
											className="transition-all duration-200"
										>
											<Grid className="w-4 h-4 mr-1" /> Grid
										</Button>
									</div>
									
									<Button 
										onClick={handleAddCategory} 
										className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
									>
										<Plus className="mr-2 h-4 w-4" /> Add Category
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Content Section */}
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[...Array(6)].map((_, i) => (
								<Card key={i} className="animate-pulse border-0 shadow-md">
									<CardContent className="p-6">
										<div className="flex items-center space-x-3 mb-4">
											<div className="w-10 h-10 bg-gray-200 rounded-full" />
											<div className="w-20 h-5 bg-gray-200 rounded" />
										</div>
										<div className="w-3/4 h-6 bg-gray-200 rounded mb-2" />
										<div className="w-full h-4 bg-gray-200 rounded mb-4" />
										<div className="flex gap-2">
											<div className="w-16 h-8 bg-gray-200 rounded" />
											<div className="w-12 h-8 bg-gray-200 rounded" />
											<div className="w-12 h-8 bg-gray-200 rounded" />
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : error ? (
						<Card className="border-red-200 bg-red-50">
							<CardContent className="p-8 text-center">
								<div className="text-red-500 text-lg font-semibold mb-2">Oops! Something went wrong</div>
								<div className="text-red-600">{error}</div>
								<Button 
									onClick={fetchCategories} 
									className="mt-4 bg-red-500 hover:bg-red-600"
								>
									Try Again
								</Button>
							</CardContent>
						</Card>
					) : (
						<div className="animate-fade-in">
							{viewMode === 'grid' ? renderGridView() : renderTableView()}
						</div>
					)}
				</div>

				{/* Enhanced Delete Dialog */}
				<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<DialogContent className="max-w-md border-0 shadow-2xl">
						<DialogHeader className="text-center">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Trash className="w-8 h-8 text-red-500" />
							</div>
							<DialogTitle className="text-xl font-bold text-gray-800">
								Delete Category
							</DialogTitle>
						</DialogHeader>
						<div className="text-center text-gray-600 mb-6">
							Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>? 
							This action cannot be undone.
						</div>
						<div className="flex gap-3">
							<Button 
								variant="outline" 
								onClick={() => setDeleteDialogOpen(false)}
								className="flex-1 border-gray-200 hover:bg-gray-50"
							>
								Cancel
							</Button>
							<Button
								onClick={confirmDelete}
								className="flex-1 bg-red-500 hover:bg-red-600 text-white"
							>
								Yes, Delete
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</main>

			<style jsx>{`
				@keyframes fade-in {
					from { opacity: 0; transform: translateY(20px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-fade-in {
					animation: fade-in 0.6s ease-out forwards;
				}
				.line-clamp-2 {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</div>
	);
};

export default CategoryView;