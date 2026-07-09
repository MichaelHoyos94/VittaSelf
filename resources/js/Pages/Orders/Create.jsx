import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const { userToOrder, products, costCenter } = usePage().props;
    const [euiCode, setEuiCode] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    console.log("userToOrder", userToOrder);
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: userToOrder ? userToOrder.id : null,
        products: selectedProducts,
        payment_method: '',
        shipping_address: '',
        phone: '',
        email: ''
    });
    const steps = ["EUI", "Products", "Checkout"];
    const currentStep = 1;
    const totalSteps = steps.length;
    const clampedCurrentStep = Math.min(Math.max(currentStep, 1), totalSteps);
    const stepGridColumns = `repeat(${Math.max(totalSteps, 1)}, minmax(0, 1fr))`;
    const lineInsetPercent = totalSteps > 0 ? 50 / totalSteps : 0;
    const progressPercent =
        totalSteps > 1
            ? ((clampedCurrentStep - 1) / (totalSteps - 1)) * 100
            : 0;
    const activeLineWidthPercent =
        progressPercent * (1 - (lineInsetPercent * 2) / 100);
    const searchUser = () => {
        if (userToOrder) {
            router.get(
                route("orders.internal-orders.create"),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ["userToOrder"],
                },
            );
            return;
        }
        if (!euiCode) {
            return;
        }
        router.get(
            route("orders.internal-orders.create"),
            { eui_code: euiCode },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["userToOrder"],
            },
        );
    };
    const handleNextStep = () => {

    }
    const handleBackStep = () => {
        
    }
    return (
        <div className="p-4 bg-white rounded">
            <h2>Create Internal Order</h2>
            <p>Complete the steps and create de order.</p>
            {/* Stepper */}
            <div className="mt-6">
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: stepGridColumns,
                    }}
                >
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber <= clampedCurrentStep;

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
            {/* Stepper progress bar */}
            <div className="relative my-5 h-8">
                <div
                    className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200"
                    style={{
                        left: `${lineInsetPercent}%`,
                        right: `${lineInsetPercent}%`,
                    }}
                />
                <div
                    className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary-400 transition-all duration-300"
                    style={{
                        left: `${lineInsetPercent}%`,
                        width: `${activeLineWidthPercent}%`,
                    }}
                />
                <div
                    className="relative z-10 grid"
                    style={{
                        gridTemplateColumns: stepGridColumns,
                    }}
                >
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber <= clampedCurrentStep;

                        return (
                            <div
                                key={`${step}-indicator`}
                                className="flex justify-center"
                            >
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-sm transition-colors duration-300 ${
                                        isActive
                                            ? "border-primary-500 bg-primary-500 text-white"
                                            : "border-gray-300 bg-white text-gray-400"
                                    }`}
                                >
                                    {stepNumber}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Content */}
            <div>
                <Form>
                    {/* Step 1 empresario*/}
                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 1 ? "block" : "hidden"}`}
                    >
                        <p>EUI</p>
                        <div className="col-span-2 grid grid-cols-8 gap-4">
                            <div className="col-span-7">
                                <Input
                                    label="Eui Code"
                                    name="eui_code"
                                    disabled={!!userToOrder}
                                    onChange={(e) => setEuiCode(e.target.value)}
                                    value={euiCode}
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="COL-51578"
                                />
                            </div>
                            <div className="flex col-span-1">
                                <button
                                    type="button"
                                    onClick={searchUser}
                                    aria-label={
                                        userToOrder
                                            ? "Remove user"
                                            : "Search user"
                                    }
                                    className="mt-8 flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-primary-50"
                                >
                                    {userToOrder ? (
                                        <XMarkIcon className="h-4 w-4 text-red-600 hover:text-red-700" />
                                    ) : (
                                        <MagnifyingGlassIcon className="h-4 w-4 text-primary-700 hover:text-primary-800" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {userToOrder && (
                            <div className="col-span-2 user-info">
                                <div className="rounded-lg border border-primary-100 bg-primary-50/60 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                                            {userToOrder.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {userToOrder.name}
                                            </p>
                                            <p className="truncate text-sm text-gray-500">
                                                {userToOrder.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs font-medium uppercase text-gray-400">
                                                EUI Code
                                            </p>
                                            <p className="font-medium text-gray-700">
                                                {userToOrder.eui_code}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium uppercase text-gray-400">
                                                Document
                                            </p>
                                            <p className="font-medium text-gray-700">
                                                {userToOrder.document_number}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs font-medium uppercase text-gray-400">
                                                plan
                                            </p>
                                            <p className="font-medium text-gray-700">
                                                {userToOrder.plan.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Step 2 productos*/}
                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 2 ? "block" : "hidden"}`}
                    >
                        <p>Products</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Catalogo de productos */}
                            <div>
                                {products.map((product) => (
                                    <div
                                        className="border rounded-xl border-2 p-4 transform transition duration-100 hover:scale-110"
                                        key={product.id}
                                    >
                                        <div>
                                            <img alt="Product image" />
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <span>${product.price}</span>
                                            <br />
                                            <strong>
                                                {product.points} points
                                            </strong>
                                            <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
                                                <PrimaryButton
                                                    className="w-full justify-center text-center sm:flex-1"
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            product.id,
                                                        )
                                                    }
                                                >
                                                    Add to order
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Productos agregados */}
                            <div>
                            </div>
                        </div>
                    </div>
                    {/* Step 3 checkout*/}
                    <div
                        className={`border-2 rounded mt-6 p-4 max-w-xl mx-auto ${currentStep === 3 ? "block" : "hidden"}`}
                    >
                        <p>Checkout</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4>Billing Information</h4>
                            </div>
                            <div>
                                <h4>Products</h4>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 justify-evenly">
                        <SecondaryButton>Back</SecondaryButton>
                        <PrimaryButton>Send</PrimaryButton>
                        <SecondaryButton>Next</SecondaryButton>
                    </div>
                </Form>
            </div>
        </div>
    );
}

Create.layout = (page) => <MainLayout children={page} />;
