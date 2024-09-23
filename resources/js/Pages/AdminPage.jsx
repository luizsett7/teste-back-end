import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CategoryCRUD from '@/Components/CategoryCRUD';
import ProductCRUD from '@/Components/ProductCRUD';

export default function AdminPage({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Catalog</h2>}
        >
            <Head title="Catalog" />

            <div className="flex flex-row max-w-7xl mx-auto">                                           
                <CategoryCRUD />                                 
                <ProductCRUD />                
            </div>
        </AuthenticatedLayout>
    );
}


