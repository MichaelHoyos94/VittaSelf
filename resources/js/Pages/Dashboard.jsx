import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <div className='p-4 bg-white rounded-lg'>
            <Head title="Dashboard" />
            <h1>Dashboard</h1>
        </div>
    );
}

Dashboard.layout = page => <MainLayout children={page} />;