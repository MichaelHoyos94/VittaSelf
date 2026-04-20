import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";

const stepSections = [
    {
        title: "OPEN",
        content: ({ disciplinaryCase }) => (
            <div className="grid grid-cols-2 gap-y-4">
                <div>
                    <p>EUI Involved</p>
                </div>
                <div>
                    <p>NAME</p>
                    <span>email</span>
                    <span>phone</span>
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
                    <p>POLICY</p>
                </div>
                <div>
                    <p>Opened At</p>
                </div>
                <div>
                    <p>DATE</p>
                </div>
                <div className="col-span-2">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vero culpa quasi dicta dolores, consequuntur ex suscipit
                        animi doloremque eveniet quaerat sint voluptates, nobis
                        blanditiis voluptatibus a minima nesciunt ducimus quas.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "EVIDENCES",
        content: () => <div>evidences</div>,
    },
    {
        title: "ON RESOLUTION",
        content: () => <div>evidences</div>,
    },
    {
        title: "CLOSED",
        content: () => <div>evidences</div>,
    },
];

const stepSpanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
};

export default function ManageCase() {
    const { disciplinaryCase, caseStatuses } = usePage().props;
    const currentStep =
        caseStatuses.findIndex(
            (status) => status.id === disciplinaryCase.case_status_id,
        ) + 1;
    const steps = caseStatuses.map((status) => status.case_status);
    const totalSteps = steps.length;
    console.log(caseStatuses);
    console.log(disciplinaryCase);
    console.log(currentStep);

    console.log(
        caseStatuses.map((s) => ({
            id: s.id,
            type: typeof s.id,
        })),
    );

    console.log({
        case_status_id: disciplinaryCase.case_status_id,
        type: typeof disciplinaryCase.case_status_id,
    });

    const handleClickNext = () => {
        router.post(
            route("sanctions.progress-case", {
                id: disciplinaryCase.id
            }),
        );
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

            {stepSections.map((section, index) => {
                const stepNumber = index + 1;
                const isVisible = currentStep === stepNumber;

                return (
                    <div
                        key={section.title}
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${isVisible ? "block" : "hidden"}`}
                    >
                        <h4 className="font-semibold text-primary-700">
                            {section.title}
                        </h4>
                        {section.content({ disciplinaryCase })}
                    </div>
                );
            })}

            <div className="mt-6">
                <div className="flex flex-wrap justify-evenly gap-1">
                    <PrimaryButton
                        onClick={handleClickNext}
                        disabled={currentStep === totalSteps}
                    >
                        Next
                    </PrimaryButton>
                    <SecondaryButton disabled={!(currentStep === totalSteps)}>
                        Resolution
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
}

ManageCase.layout = (page) => <MainLayout children={page} />;
