import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <div>
            <Head title="Dashboard" />
            <h1>Dashboard</h1>
        </div>
    );
}

Dashboard.layout = page => <MainLayout children={page} />;