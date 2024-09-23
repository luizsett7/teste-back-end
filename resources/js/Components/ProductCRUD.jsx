import React, { useState, useEffect } from 'react';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../Services/productService';
import { getCategories } from '../Services/categoryService';

const ProductCRUD = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByImage, setFilterByImage] = useState('');
    const [searchId, setSearchId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts(currentPage);
        fetchCategories();
    }, [currentPage]);

    const fetchProducts = async (page = 1) => {
        const response = await getProducts(page);     
        setProducts(response.data.data);
        setCurrentPage(page);
        setTotalPages(response.data.last_page);
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const searchProductById = async (id) => {
        try {
            const response = await getProductById(id);
            const product = response.data;
            if (product) {
                setProducts([product]); 
            } else {
                alert('Produto não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            alert('Erro ao buscar produto');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, price, description, category_id: categoryId };
        if (editingId) {
            await updateProduct(editingId, productData);
            setEditingId(null);
        } else {
            await createProduct(productData);
        }
        resetForm();
        fetchProducts();
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setCategoryId('');
    };

    const handleEdit = (product) => {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategoryId(product.category_id);
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categories.find(cat => cat.id === product.category_id)?.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesImage = filterByImage === '' || 
                         (filterByImage === 'with' && product.image) || 
                         (filterByImage === 'without' && !product.image);

        return (matchesName || matchesCategory) && matchesImage;        
    });

    const handlePageChange = (page) => {
        fetchProducts(page);
    };

    return (
        <div className="max-w-4xl ml-4 mt-10 p-4 border rounded shadow-xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
            
            <input 
                type="text" 
                placeholder="Search by Name or Category" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <select 
                value={filterByImage} 
                onChange={(e) => setFilterByImage(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Products</option>
                <option value="with">With Image</option>
                <option value="without">Without Image</option>
            </select>

            <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
                onClick={() => searchProductById(searchId)}
                className="w-full bg-blue-500 mb-4 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Search by ID
            </button>

            <form onSubmit={handleSubmit} className="mb-6">
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <select 
                    value={categoryId} 
                    onChange={(e) => setCategoryId(e.target.value)} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>
            <ul className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                    <li key={product.id} className="flex justify-between items-center py-4 px-2 bg-white hover:bg-gray-50 transition-shadow shadow-sm rounded-lg mb-4">
                        <span className="text-lg font-medium text-gray-900">
                            {product.name} - <span className="text-gray-600">${product.price}</span> - <span className="text-sm text-gray-500">{product.category.name}</span>
                        </span>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleEdit(product)}
                                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 transition-all duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition-all duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            { searchTerm === '' &&  
                <div className="flex justify-center mt-6">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button 
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
};

export default ProductCRUD;
