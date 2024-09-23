import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductFormImport({ auth }) {
    const [productId, setProductId] = useState('');

    const handleImport = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('id', productId);
        
        fetch('/products/import', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Import process started successfully!');
                setProductId(''); 
            } else {
                alert('Failed to start import process.');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product Import</h2>}
        >
            <Head title="Product Import" />

            <div className="flex flex-col max-w-7xl mx-auto p-4">
                <form onSubmit={handleImport} className="flex space-x-2 mb-4">
                    <input 
                        type="text" 
                        placeholder="Product ID" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                        Import
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-2">
                    Insert the ID product or keep empty to import all of them. The importation takes some seconds.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}

