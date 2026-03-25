import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import Modal from "@/Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import { EyeIcon, MinusIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Index() {
    const { users, flash } = usePage().props;
    const [message, setMessage] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        last_name: '',
        document_number: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const columns = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Name', render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span>{row.name}</span>
                    <button
                        onClick={() => {
                            setSelectedUser(row);
                            setModalMode('view');
                            setModalOpen(true);
                        }}
                        className="ml-2 bg-transparent rounded-full transform transition-transform duration-300 hover:scale-110"
                    >
                        <EyeIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
            )
        },
        { header: 'Last Name', accessor: 'last_name' },
        { header: 'Document', accessor: 'document_number' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Actions', render: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => openEditModal(row)}
                        className="px-2 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transform transition-transform duration-300 hover:scale-110"
                    >
                        <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => {
                            // Handle delete action
                        }}
                        className="px-2 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform transition-transform duration-300 hover:scale-110"
                    >
                        <MinusIcon className="h-5 w-5" />
                    </button>
                </div>
            )
        }
    ];

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            const time = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(time);
        }
    }, [flash.success])

    const openCreateModal = () => {
        setModalMode('create');
        setModalOpen(true);
        setData({
            name: '',
            last_name: '',
            document_number: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
        });
    }

    const openEditModal = ($user) => {
        setModalMode('edit');
        setSelectedUser($user);

        setData({
            name: $user.name,
            last_name: $user.last_name,
            document_number: $user.document_number,
            email: $user.email,
            phone: $user.phone,
        });

        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'create') {
            post(route('human-resources.store'), {
                onSuccess: () => {
                    reset();
                    setModalOpen(false);
                }
            });
        } else if (modalMode === 'edit') {
            put(route('human-resources.update', selectedUser.id), {
                onSuccess: () => {
                    reset();
                    setModalOpen(false);
                }
            });
        }
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
                {message && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                        {message}
                    </div>
                )}
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
                { /* Show if is edit or create */}
                {modalMode === 'edit' || modalMode === 'create' ? (
                    <div>
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
                                    label='Name'
                                    name='name'
                                    type='text'
                                    value={data.name}
                                    placeholder='John doe...'
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />
                                <Input
                                    label='Last Name'
                                    name='last_name'
                                    type='text'
                                    value={data.last_name}
                                    placeholder='Smith...'
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                                <Input
                                    label='Document Number'
                                    name='document_number'
                                    type='text'
                                    value={data.document_number}
                                    placeholder='97234241'
                                    onChange={(e) => setData('document_number', e.target.value)}
                                />
                                <Input
                                    label='Email'
                                    name='email'
                                    type='email'
                                    value={data.email}
                                    placeholder='john.doe@example.com'
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <Input
                                    label='Phone'
                                    name='phone'
                                    type='text'
                                    value={data.phone}
                                    placeholder='321-807-9660'
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                <Input
                                    label='Password'
                                    name='password'
                                    type='password'
                                    placeholder='********'
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <Input
                                    label='Confirm Password'
                                    name='password_confirmation'
                                    type='password'
                                    placeholder='********'
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition duration-300"
                                >
                                    {modalMode === 'create' ? 'Create User' : 'Update User'}
                                </button>
                            </Form>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                User Details
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <p><strong>Name:</strong> {selectedUser?.name}</p>
                            <p><strong>Last Name:</strong> {selectedUser?.last_name}</p>
                            <p><strong>Document Number:</strong> {selectedUser?.document_number}</p>
                            <p><strong>Email:</strong> {selectedUser?.email}</p>
                            <p><strong>Phone:</strong> {selectedUser?.phone}</p>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
