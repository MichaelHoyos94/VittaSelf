import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const { policies, complianceSources, disciplinaryCases } = usePage().props;
    console.log(disciplinaryCases);
    const { data, setData, post, errors, reset } = useForm({
        'facts_description': '',
        'details': '',
        'user_id': '',
        'policy_id': '',
        'compliance_source_id': '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "EUI", render: (row) => (
                <div className="flex items-center gap-3">
                    {/* Avatar con inicial */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    {/* Información textual */}
                    <div className="flex flex-col">
                        <strong className="font-medium">
                            {row.user?.name}
                        </strong>
                        <span className="text-sm text-gray-500">
                            {row.user?.email}
                        </span>
                        <span className="text-sm text-gray-500">
                            {row.user?.document_number}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: "POLICY", render: (row) => (
                <div>
                    {row.policy.policy}
                </div>
            )
        },
        {
            header: "ADMINISTRATOR", render: (row) => (
                <div>
                    {row.admin?.name}
                </div>
            )
        },
        {
            header: "STATUS", render: (row) => (
                <div className="p-2 rounded-full bg-primary-200 text-center">
                    {row.case_status?.case_status}
                </div>
            )
        },
        {
            header: "ACTIONS", render: (row) => (
                <div>
                    <button className="px-2 py-2 bg-primary-700 rounded-full hover:bg-primary-800 transform transition-transform duration-300 hover:scale-110">
                        <EllipsisHorizontalIcon className="h-4 w-4 text-primary-50"></EllipsisHorizontalIcon>
                    </button>
                </div>
            )
        },
    ];
    const handleOpenCreateModal = () => {
        console.log("Opening create modal");
        setModalMode("create");
        setModalOpen(true);
    };
    const searchUser = () => {
        console.log("Searching user with Eui Code:", data.user_id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sanctions.disciplinary-cases.store'), {
            onSuccess: () => {
                setModalOpen(false);
                reset();
            }
        });
    }
    return (
        <div className="p-4 rounded bg-white shadow">
            <div>
                <h1>Disciplinary cases</h1>
                <p>Investigations on going</p>
            </div>
            <div className="flex flex-row items-center mb-4 justify-start gap-2">
                <PrimaryButton onClick={handleOpenCreateModal}>
                    Create Case
                </PrimaryButton>
                <SecondaryButton>Export</SecondaryButton>
            </div>
            <Table
                columns={columns}
                data={disciplinaryCases}
                emptyText="No disciplinary cases found"
            ></Table>
            <Modal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                maxWidth="2xl"
            >
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        New Disciplinary Case
                    </h2>
                </div>
                <div className="mx-4 my-6 display-none">
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 grid grid-cols-8 gap-4">
                                <div className="col-span-7">
                                    <Input
                                        label="Eui Code"
                                        name="user_id"
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', parseInt(e.target.value) || '')}
                                        error={errors.user_id}
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="COL-51578"
                                    />
                                </div>
                                <div className="flex col-span-1">
                                    <button type="button" onClick={searchUser}>
                                        <MagnifyingGlassIcon className="h-4 w-4 text-primary-700 hover:text-primary-800"></MagnifyingGlassIcon>
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2 user-info">
                            </div>
                            <div className="col-span-2">
                                <TextArea
                                    label="Facts Description *"
                                    name="facts_description"
                                    value={data.facts_description}
                                    onChange={(e) => setData('facts_description', e.target.value)}
                                    placeholder="Describe the facts of the case here..."
                                    error={errors.facts_description}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Policy"
                                    name="policy_id"
                                    value={data.policy_id}
                                    onChange={(e) => setData('policy_id', e.target.value)}
                                    error={errors.policy_id}
                                    options={policies.map(policy => ({ value: policy.id, label: policy.policy }))}
                                    placeholder="Select a policy"
                                />
                            </div>
                            <div>
                                <Select
                                    label="Compliance Source"
                                    name="compliance_source_id"
                                    value={data.compliance_source_id}
                                    onChange={(e) => setData('compliance_source_id', e.target.value)}
                                    error={errors.compliance_source_id}
                                    options={complianceSources.map(source => ({ value: source.id, label: source.source }))}
                                    placeholder="Select a compliance source"
                                />
                            </div>
                            <div className="col-span-2">
                                <TextArea
                                    label="Additional Details"
                                    name="details"
                                    value={data.details}
                                    onChange={(e) => setData('details', e.target.value)}
                                    placeholder="Compliant by COL-59120, Internal investigation number 2024-0001, etc..."
                                    error={errors.details}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-end gap-2 mt-4">
                            <SecondaryButton onClick={() => setModalOpen(false)}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                Create Case
                            </PrimaryButton>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
