import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../Services/categoryService';

const CategoryCRUD = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateCategory(editingId, { name });
            setEditingId(null);
        } else {
            await createCategory({ name });
        }
        setName('');
        fetchCategories();
    };

    const handleEdit = (category) => {
        setName(category.name);
        setEditingId(category.id);
    };

    const handleDelete = async (id) => {
        await deleteCategory(id);
        fetchCategories();
    };

    const filteredCategories = categories.filter(category => {
        const matchesName = category.name.toLowerCase().includes(searchTerm.toLowerCase());        
        return matchesName;
    });

    return (
        <div className="max-w-md ml-4 mt-10 p-4 border rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Categories</h1>

            <input 
                type="text" 
                placeholder="Search by Category" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <form onSubmit={handleSubmit} className="mb-6">
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category Name"
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>
            <ul className="divide-y divide-gray-200">
                {filteredCategories.map(category => (
                    <li key={category.id} className="flex justify-between items-center py-2">
                        <span className="text-lg">{category.name}</span>
                        <div>
                            <button 
                                onClick={() => handleEdit(category)} 
                                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition mr-2"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(category.id)} 
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryCRUD;
