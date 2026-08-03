import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className='min-h-full rounded-xl border border-white/50 bg-white/75 p-8 shadow-lg backdrop-blur-lg'>
            <Head title="Dashboard" />
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>

            </div>
        </div>
    );
}

Dashboard.layout = page => <MainLayout children={page} />;