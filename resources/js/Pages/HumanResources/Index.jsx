import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { users } = usePage().props;
    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Last Name', accessor: 'last_name'},
        { header: 'Document', accessor: 'document_number'},
        { header: 'Phone', accessor: 'phone' },
        { header: 'Email', accessor: 'email' },
    ];
    console.log(users);
    return (
        <div className="p-4 bg-white rounded-lg">
            <h1 className="text-green-500">Human Resources</h1>
            <Table
                columns={columns}
                data={users}
                emptyText="No employees found"
            >
            </Table>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;