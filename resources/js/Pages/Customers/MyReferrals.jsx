import Table from '@/Components/Table';
import MainLayout from '@/Layouts/MainLayout';
import { router, usePage } from '@inertiajs/react';

export default function MyReferrals() {
    const { representedUsers } = usePage().props;

    const columns = [
        {
            header: 'name',
            render: (row) => (
                <div className="flex flex-col">
                    <strong>{row.full_name}</strong>
                    <span className="text-gray-400">{row.email}</span>
                </div>
            ),
        },
        {
            header: 'eui code',
            accessor: 'eui_code',
        },
        {
            header: 'plan',
            render: (row) => row.plan?.name ?? 'N/A',
        },
        {
            header: 'points',
            render: (row) => Number(row.points ?? 0).toFixed(2),
        },
        {
            header: 'registered at',
            render: (row) => new Date(row.created_at).toLocaleDateString(),
        },
    ];

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {}, { preserveState: true });
        }
    };

    return (
        <div className="min-h-full space-y-4 rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-lg">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">My Referrals</h2>
                <p className="text-sm text-slate-500">
                    Direct entrepreneurs represented by your EUI network.
                </p>
            </div>

            <Table
                columns={columns}
                data={representedUsers.data}
                from={representedUsers.from}
                to={representedUsers.to}
                totalResults={representedUsers.total}
                links={representedUsers.links}
                onPageChange={handlePageChange}
                emptyText="You do not have direct referrals yet."
            />
        </div>
    );
}

MyReferrals.layout = (page) => <MainLayout children={page} />;
