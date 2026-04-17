import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const { policies, complianceSources } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "CUSTOMER", accessor: "customer" },
        { header: "POLICY", accessor: "policy" },
        { header: "ADMINISTRATOR", accessor: "administrator" },
        { header: "STATUS", accessor: "status" },
    ];
    const handleOpenCreateModal = () => {
        console.log("Opening create modal");
        setModalMode("create");
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
                data={[]}
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
                                        name="eui_code"
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="COL-51578"
                                    />
                                </div>
                                <div className="flex col-span-1">
                                    <button>
                                        <MagnifyingGlassIcon className="h-4 w-4 text-primary-700 hover:text-primary-800"></MagnifyingGlassIcon>
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2 user-info">
                            </div>
                            <div className="col-span-2">
                                <TextArea
                                    label="Facts Description"
                                    name="facts_description"
                                    placeholder="Describe the facts of the case here..."
                                />
                            </div>
                            <div>
                                <Select 
                                    label="Policy"
                                    name="policy_id"
                                    options={policies.map(policy => ({ value: policy.id, label: policy.policy }))}
                                    placeholder="Select a policy"
                                />
                            </div>
                            <div>
                                <Select 
                                    label="Compliance Source"
                                    name="compliance_source_id"
                                    options={complianceSources.map(source => ({ value: source.id, label: source.source }))}
                                    placeholder="Select a compliance source"
                                />
                            </div>
                            <div className="col-span-2">
                                <TextArea 
                                    label="Additional Details"
                                    name="details"
                                    placeholder="Compliant by COL-59120, Internal investigation number 2024-0001, etc..."
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
