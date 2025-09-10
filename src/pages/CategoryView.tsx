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
import { Plus, Pencil, Trash, ExternalLink } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';



const CategoryView = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [editId, setEditId] = useState<number | null>(null);
	const [editName, setEditName] = useState('');
	const [editDescription, setEditDescription] = useState('');
	const [editLoading, setEditLoading] = useState(false);

	const fetchCategories = async () => {
		setLoading(true);
		setError('');
		try {
			const data = await getCategories();
			setCategories(data);
		} catch (err: any) {
			setError(err.response?.data?.message || err.message || 'Failed to load categories');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

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

	const handleDelete = async (id: number) => {
		if (!window.confirm('Are you sure you want to delete this category?')) return;
		setLoading(true);
		try {
			await deleteCategory(id);
			fetchCategories();
		} catch (err: any) {
			alert(err.response?.data?.message || err.message || 'Failed to delete category');
		} finally {
			setLoading(false);
		}
	};

		return (
			<div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
				<Header
					title="All Categories"
					subtitle="View and manage categories"
					showBackButton={true}
					onBackClick={() => navigate(-1)}
				/>
				<main className="flex-1 overflow-y-auto p-6 animate-fade-in">
					<Card className="max-w-5xl mx-auto mb-8">
						<CardContent className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-semibold">All Categories</h2>
								<Button onClick={handleAddCategory} className="bg-saas-blue hover:bg-saas-blue/90">
									<Plus className="mr-2 h-4 w-4" /> Add Category
								</Button>
							</div>
							   <div className="overflow-x-auto">
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
												   <TableHead>Category</TableHead>
												   <TableHead>Description</TableHead>
												   <TableHead className="w-[80px]">Actions</TableHead>
											   </TableRow>
										   </TableHeader>
																	   <TableBody>
																		   {categories.length > 0 ? (
																			   categories.map((category) => (
																				   <TableRow key={category.id} className="hover:bg-gray-50">
																					   <TableCell>
																						   {editId === category.id ? (
																							   <input
																								   className="border px-2 py-1 rounded w-full"
																								   value={editName}
																								   onChange={e => setEditName(e.target.value)}
																								   disabled={editLoading}
																							   />
																						   ) : (
																							   <span className="font-medium">{category.name}</span>
																						   )}
																					   </TableCell>
																					   <TableCell>
																						   {editId === category.id ? (
																								<input
																									className="border px-2 py-1 rounded w-full"
																									value={editDescription}
																									onChange={e => setEditDescription(e.target.value)}
																									disabled={editLoading}
																								/>
																							) : (
																								<span className="text-sm text-gray-700">{category.description}</span>
																							)}
																						</TableCell>
																						<TableCell>
																							<div className="flex gap-2">
																															<Button
																																variant="outline"
																																size="sm"
																																onClick={() => handleViewCategories(category.id, category.name)}
																																disabled={editId === category.id}
																															>
																																<ExternalLink className="h-4 w-4 mr-1" /> Open
																															</Button>
																								{editId === category.id ? (
																									<>
																										<Button
																											variant="outline"
																											size="sm"
																											onClick={handleEditSave}
																											disabled={editLoading}
																										>
																											Save
																										</Button>
																										<Button
																											variant="outline"
																											size="sm"
																											onClick={handleEditCancel}
																											disabled={editLoading}
																										>
																											Cancel
																										</Button>
																									</>
																								) : (
																									<Button
																										variant="outline"
																										size="sm"
																										onClick={() => handleEdit(category)}
																									>
																										<Pencil className="h-4 w-4 mr-1" /> Edit
																									</Button>
																								)}
																								<Button
																									variant="outline"
																									size="sm"
																									className="text-red-500 border-red-200 hover:bg-red-50"
																									onClick={() => handleDelete(category.id)}
																									disabled={editId === category.id}
																								>
																									<Trash className="h-4 w-4 mr-1" /> Delete
																								</Button>
																							</div>
																						</TableCell>
																					</TableRow>
																				))
																			) : (
																				<TableRow>
																					<TableCell colSpan={3} className="text-center py-10">
																						No categories found.
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

export default CategoryView;
    