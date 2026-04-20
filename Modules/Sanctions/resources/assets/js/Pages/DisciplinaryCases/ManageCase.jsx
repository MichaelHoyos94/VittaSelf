import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";

const steps = ["OPEN", "EVIDENCES", "INVESTIGATION", "RESOLUTION"];
const stepSections = [
    { title: "OPEN", content: "hola" },
    { title: "EVIDENCES", content: "hola" },
    { title: "INVESTIGATION", content: "hola" },
    { title: "RESOLUTION", content: "hola" },
];

const stepSpanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
};

export default function ManageCase() {
    const totalSteps = steps.length;
    const [currentStep, setCurrentStep] = useState(1);

    const handleClickNext = () => {
        setCurrentStep((previousStep) => Math.min(previousStep + 1, totalSteps));
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <div>
                <h1>Manage Case</h1>
                <p>Managing case #1254</p>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-4 gap-4">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber <= currentStep;

                        return (
                            <div key={step} className="text-center">
                                <h3
                                    className={`text-sm font-semibold ${isActive ? "text-primary-600" : "text-gray-400"
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
                        className={`border rounded mt-6 p-4 ${isVisible ? "block" : "hidden"}`}
                    >
                        <h4 className="font-semibold text-primary-700">{section.title}</h4>
                        <p>{section.content}</p>
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
                    <SecondaryButton
                        disabled={!(currentStep === totalSteps)}
                    >
                        Resolution
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
}

ManageCase.layout = (page) => <MainLayout children={page} />;
