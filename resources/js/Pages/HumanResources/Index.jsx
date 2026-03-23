import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import Modal from "@/Components/Modal";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";

export default function Index() {
    const { users } = usePage().props;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalMode, setModalMode ] = useState('create');
    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Last Name', accessor: 'last_name' },
        { header: 'Document', accessor: 'document_number' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Email', accessor: 'email' },
    ];

    const openCreateModal = () => {
        setModalMode('create');
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="p-4 bg-white rounded-lg">
            <h1 className="text-green-500">Human Resources</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={openCreateModal}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition duration-300"
                >
                    Create User
                </button>
            </div>
            <Table
                columns={columns}
                data={users}
                emptyText="No employees found"
            >
            </Table>
            <Modal
                show={modalOpen}
                onClose={closeModal}
                maxWidth="lg"
            >
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {modalMode === 'create' ? 'Create User' : 'Edit User'}
                    </h2>
                </div>
                <div className="mx-4 my-6">
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Input 
                            label = 'Name'
                            name = 'name'
                            type = 'text'
                            placeholder= 'John doe...'
                        />
                        <Input 
                            label = 'Last Name'
                            name = 'last_name'
                            type = 'text'
                            placeholder = 'Smith...'
                        />
                        <Input 
                            label = 'Document Number'
                            name = 'document_number'
                            type = 'text'
                            placeholder = '97234241'
                        />
                        <Input 
                            label = 'Email'
                            name = 'email'
                            type = 'email'
                            placeholder = 'john.doe@example.com'
                        />
                        <Input 
                            label = 'Phone'
                            name = 'phone'
                            type = 'text'
                            placeholder= '321-807-9660'
                        />
                        <Input 
                            label = 'Password'
                            name = 'password'
                            type = 'password'
                            placeholder= '********'
                        />
                        <Input 
                            label = 'Confirm Password'
                            name = 'password_confirmation'
                            type = 'password'
                            placeholder= '********'
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition duration-300"
                        >
                            {modalMode === 'create' ? 'Create User' : 'Update User'}
                        </button>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;