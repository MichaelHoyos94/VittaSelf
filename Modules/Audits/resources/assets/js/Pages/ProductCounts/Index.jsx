import Badge from "@/Components/Badge";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";

export default function Index() {
    const { productCounts } = usePage().props;

    const columns = [
        {
            header: "Counted By",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span>{row.user.full_name}</span>
                        <span className="text-sm text-gray-500">{row.user.email}</span>
                        <span className="text-sm text-gray-500">{row.user.phone}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "Count Date",
            render: (row) => <span>{new Date(row.count_date).toLocaleString('en-US', {
                'year': 'numeric',
                'month': 'long',
                'day': 'numeric',
            })}</span>
        },
        {
            header: "Observations",
            accessor: "observations",
        },
        {
            header: "Audited",
            render: (row) => (
                <Badge
                    type={row.audit ? (
                        row.audit.status === 'correct' ? 'success'
                            : row.audit.status === 'correct with issues' ? 'warning'
                                : 'error'
                    ) : 'info'}
                    text={row.audit ? row.audit.status : 'pending'}
                />
            ),
        },
    ];

    const handlePageChange = (url) => {

    }

    const handleSearchChange = (search) => {
        router.get(route("audits.product-counts.index"), { search }, { preserveState: true, replace: true });
    }

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2">
            <div>
                <h2>Product counts</h2>
                <p>Daily product counts by cost center</p>
            </div>
            <div className="mb-4 flex flex-row gap-2 items-center justify-start">
                <Link href={route("audits.product-counts.create")}>
                    <PrimaryButton type="button">Create</PrimaryButton>
                </Link>
                <SecondaryButton type="button">Export</SecondaryButton>
            </div>
            <div>
                <Table
                    columns={columns}
                    filterable
                    data={productCounts.data}
                    to={productCounts.to}
                    from={productCounts.from}
                    totalResults={productCounts.total}
                    emptyText="Not product counts registered yet."
                    links={productCounts.links}
                    onPageChange={handlePageChange}
                    onSearchChange={handleSearchChange}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
