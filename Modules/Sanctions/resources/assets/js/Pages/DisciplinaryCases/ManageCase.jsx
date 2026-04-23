import Form from "@/Components/Form/Form";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

const stepSpanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
};

export default function ManageCase() {
    const {
        disciplinaryCase,
        caseStatuses,
        sanctionLevels,
        sanctions,
        mitigations,
    } = usePage().props;

    const { data, setData, post } = useForm({
        resolution_text: "",
        resolution_type: "",
        sanction_level_id: "",
        sanctions: [],
        mitigations: [],
    });

    const [modalOpen, setModalOpen] = useState(false);
    const currentStep =
        caseStatuses.findIndex(
            (status) => status.id === disciplinaryCase.case_status_id,
        ) + 1;
    const steps = caseStatuses.map((status) => status.case_status);
    const totalSteps = steps.length;

    const handleClickNext = (e) => {
        e.preventDefault();
        setModalOpen(false);
        router.post(
            route("sanctions.progress-case", {
                id: disciplinaryCase.id,
            }),
        );
    };

    const handleClickResolution = (e) => {
        e.preventDefault();
        console.log("Resolution data:", data);
        /*
        router.post(
            route("sanctions.resolve-case", {
                id: disciplinaryCase.id,
            }),
            {
                ...data,
            },
        ); */
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <div>
                <h1>Manage Case</h1>
                <p>Managing case {disciplinaryCase.id}</p>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-4 gap-4">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber <= currentStep;

                        return (
                            <div key={step} className="text-center">
                                <h3
                                    className={`text-sm font-semibold ${
                                        isActive
                                            ? "text-primary-600"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {step}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-4 mt-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                    className={`h-1.5 bg-primary-400 transition-all duration-300 ${stepSpanClasses[currentStep]}`}
                />
            </div>

            <div>
                <Form onSubmit={handleClickResolution}>
                    {/* Step #1 */}
                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 1 ? "block" : "hidden"}`}
                    >
                        <div className="grid grid-cols-2 gap-y-4">
                            <div>
                                <p>EUI Involved</p>
                            </div>
                            <div>
                                <p>{disciplinaryCase.user?.name}</p>
                                <div>
                                    <span className="text-sm text-gray-500">
                                        {disciplinaryCase.user?.email}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">
                                        {disciplinaryCase.user?.phone}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p>Admin in charge</p>
                            </div>
                            <div>
                                <p>ADMIN</p>
                            </div>
                            <div>
                                <p>Policy</p>
                            </div>
                            <div>
                                <p>{disciplinaryCase.policy?.policy}</p>
                            </div>
                            <div>
                                <p>Opened At</p>
                            </div>
                            <div>
                                <p>
                                    {new Date(
                                        disciplinaryCase.created_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p>
                                    Opening of the case, check the details are
                                    correct before proceeding. This will assign
                                    the case to you and you will be responsible
                                    for progressing the case to the next status.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step #2 */}
                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 2 ? "block" : "hidden"}`}
                    >
                        {/* File icon */}
                        <ArrowUpOnSquareIcon className="w-32 h-32 text-primary mx-auto mb-4" />
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mx-auto mb-4 gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-duration:1.2s] opacity-100"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-duration:1.2s] opacity-30 [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-duration:1.2s] opacity-30 [animation-delay:0.4s]"></div>
                        </div>

                        <p>
                            During this stage, EUI and the admin in charge will
                            be able to upload evidences to the case. This can be
                            done by clicking the "Add Evidence" button and
                            selecting the file to upload. Once the file is
                            uploaded, it will be visible to both parties and can
                            be downloaded or deleted if necessary.
                        </p>
                    </div>

                    {/* Step #3 */}

                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 3 ? "block" : "hidden"}`}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <TextArea
                                    label="Resolution details"
                                    name="resolution_text"
                                    value=""
                                    onChange={() => {}}
                                    placeholder="Enter the details of the resolution here..."
                                    rows={5}
                                />
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label="Resolution"
                                    name="resolution_type"
                                    value=""
                                    onChange={() => {}}
                                    options={[
                                        { value: "1", label: "Procede" },
                                        {
                                            value: "2",
                                            label: "Not Procede",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label="Resolution Severity"
                                    name="sanction_level_id"
                                    value=""
                                    onChange={() => {}}
                                    options={sanctionLevels?.map((level) => ({
                                        value: level.id,
                                        label: level.sanction_level,
                                    }))}
                                />
                            </div>
                            <div className="col-span-2">
                                {/* Multi checkbox with the sanctions options */}
                                <p className="mb-2">Sanctions</p>
                                {/* flex container avoiding to stack the checkboxes */}
                                <div className="flex flex-wrap gap-2">
                                    {sanctions.map((sanction) => (
                                        <label
                                            key={sanction.id}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                name={`sanction_${sanction.id}`}
                                                value={sanction.id}
                                                onChange={() => {}}
                                                className="form-checkbox h-4 w-4 text-primary"
                                            />
                                            <span>{sanction.sanction}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2">
                                {/* Multi checkbox with the mitigation options */}
                                <p className="mb-2">Mitigations</p>
                                {/* flex container avoiding to stack the checkboxes */}
                                <div className="flex flex-wrap gap-2">
                                    {mitigations.map((mitigation) => (
                                        <label
                                            key={mitigation.id}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                name={`mitigation_${mitigation.id}`}
                                                value={mitigation.id}
                                                onChange={() => {}}
                                                className="form-checkbox h-4 w-4 text-primary"
                                            />
                                            <span>{mitigation.mitigation}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* step #4 */}
                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 4 ? "block" : "hidden"}`}
                    >
                        <p>
                            Resolution closed with details and
                            sanctions/mitigations assigned.
                        </p>
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-wrap justify-evenly gap-1">
                            <PrimaryButton
                                onClick={() => setModalOpen(true)}
                                disabled={currentStep === totalSteps}
                            >
                                Next
                            </PrimaryButton>
                            <SecondaryButton
                                disabled={!(currentStep === totalSteps - 1)}
                                onClick={handleClickResolution}
                            >
                                Resolution
                            </SecondaryButton>
                        </div>
                    </div>
                </Form>
            </div>

            <Modal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                maxWidth="lg"
            >
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Switch case status
                    </h2>
                </div>
                <div className="mx-4 my-6">
                    <p>
                        <strong className="font-bold">Warning!</strong> This
                        will take the current status of the case to the next
                        status. This can't be undone.
                    </p>
                    <div className="flex flex-row items-center justify-end gap-2 mt-4">
                        <SecondaryButton onClick={() => setModalOpen(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton onClick={handleClickNext} type="button">
                            Continue
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

ManageCase.layout = (page) => <MainLayout children={page} />;
