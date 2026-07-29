import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import {
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";

export default function Create() {
    const {
        userToOrder,
        products,
        costCenter,
        sanctions = [],
        flash,
    } = usePage().props;
    const [euiCode, setEuiCode] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const [errorMessage, setErrorMessage] = useState(flash.error);

    const planFreezeSanction = sanctions.some(
        (sanction) => sanction.FREEZE_PLAN,
    );
    const pointsFreezeSanction = sanctions.some(
        (sanction) => sanction.FREEZE_POINTS,
    );

    const discountBenefit = userToOrder?.plan?.benefits?.find(
        (benefit) => benefit.type === "discount",
    );
    const discountValue = Number(discountBenefit?.value ?? 0);
    const hasDiscount = discountValue > 0;

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: userToOrder ? userToOrder.id : null,
        products: selectedProducts,
        payment_method: "",
        shipping_address: userToOrder ? userToOrder.address : "",
        phone: userToOrder ? userToOrder.phone : "",
        email: userToOrder ? userToOrder.email : "",
    });

    useEffect(() => {
        setData((currentData) => ({
            ...currentData,
            user_id: userToOrder ? userToOrder.id : null,
            shipping_address: userToOrder?.address ?? "",
            phone: userToOrder?.phone ?? "",
            email: userToOrder?.email ?? "",
        }));
        setEuiCode(userToOrder?.eui_code ?? "");
    }, [userToOrder]);

    useEffect(() => {
        setData((currentData) => ({
            ...currentData,
            products: selectedProducts,
        }));
    }, [selectedProducts]);

    useEffect(() => {
        setSuccessMessage(flash.success);
        setErrorMessage(flash.error);

        if (!flash.success && !flash.error) return;

        const timer = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.success, flash.error]);

    const steps = ["EUI", "Products", "Checkout"];
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
                    only: ["userToOrder", "sanctions"],
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
                only: ["userToOrder", "sanctions"],
            },
        );
    };
    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };
    const handleBackStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };
    const handleAddProduct = (e, product) => {
        e.preventDefault();
        setSelectedProducts((prev) => [
            ...prev,
            {
                id: product.id,
                quantity: 1,
                points: product.points,
                price: product.price,
            },
        ]);
    };
    const handleRemoveProduct = (e, product) => {
        e.preventDefault();
        setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    };
    const handleIncreaseProduct = (productId) => {
        setSelectedProducts((prev) =>
            prev.map((p) =>
                p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
            ),
        );
    };
    const handleDecreaseProduct = (productId) => {
        setSelectedProducts((prev) =>
            prev.map((p) =>
                p.id === productId && p.quantity > 1
                    ? { ...p, quantity: p.quantity - 1 }
                    : p,
            ),
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("orders.internal-orders.store"));
    };
    return (
        <div className="p-4 bg-white rounded">
            <h2>Create Internal Order</h2>
            <p>Complete the steps and create de order.</p>
            <div className="space-y-4 my-4">
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            {successMessage}
                        </span>
                    </div>
                )}
                {errorMessage && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            {errorMessage}
                        </span>
                    </div>
                )}
            </div>
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
                                    className={`text-sm font-semibold ${isActive
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
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-sm transition-colors duration-300 ${isActive
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
                <Form
                    onSubmit={handleSubmit}
                >
                    {/* Step 1 empresario*/}
                    <div
                        className={`border-2 rounded mt-6 p-4 mx-auto ${currentStep === 1 ? "block" : "hidden"}`}
                    >
                        <h3>EUI</h3>
                        <div className="grid grid-cols-8 gap-4">
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
                            <div className="flex content-center col-span-1">
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
                            <div className="user-info">
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
                                                {userToOrder?.plan?.name || "This EUI has no plan."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 my-4">
                                    {planFreezeSanction && (
                                        <div
                                            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                                            role="alert"
                                        >
                                            <span className="block sm:inline">
                                                Your plan is currently frozen
                                                due to a sanction. Benefits will
                                                not be available until the
                                                freeze is lifted.
                                            </span>
                                        </div>
                                    )}
                                    {pointsFreezeSanction && (
                                        <div
                                            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                                            role="alert"
                                        >
                                            <span className="block sm:inline">
                                                Your points are currently frozen
                                                due to a sanction. Points will
                                                not increment in this order.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Step 2 productos*/}
                    <div
                        className={`border-2 rounded mt-6 p-4 mx-auto ${currentStep === 2 ? "block" : "hidden"}`}
                    >
                        <h3>Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Catalogo de productos with scroll*/}
                            <div className="max-h-96 overflow-y-auto space-y-4">
                                {products.data.map((product) => (
                                    <div
                                        className="border rounded-xl border-2 p-4 transform transition duration-300 hover:shadow-lg"
                                        key={product.id}
                                    >
                                        <div className="flex flex-row flex-wrap justify-between gap-4">
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <span>{formatCurrency(product.price)}</span>
                                            <br />
                                            <strong>
                                                {product.points} points
                                            </strong>
                                            <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
                                                <PrimaryButton
                                                    className="w-full justify-center text-center sm:flex-1"
                                                    onClick={(e) =>
                                                        handleAddProduct(
                                                            e,
                                                            product,
                                                        )
                                                    }
                                                    disabled={selectedProducts.some(
                                                        (selectedProduct) =>
                                                            selectedProduct.id ===
                                                            product.id,
                                                    )}
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
                                <div className="flex flex-col gap-4 my-4">
                                    {selectedProducts.length === 0 ? (
                                        <p>The cart is empty.</p>
                                    ) : (
                                        <>
                                            {selectedProducts.map((product) => (
                                                <div
                                                    className="border rounded-xl p-4"
                                                    key={product.id}
                                                >
                                                    <div className="flex flex-row flex-wrap justify-between gap-4">
                                                        <div>
                                                            {
                                                                products.data.find(
                                                                    (item) =>
                                                                        item.id ===
                                                                        product.id,
                                                                )?.name
                                                            }
                                                        </div>
                                                        <div className="flex flex-row gap-4">
                                                            <div className="flex flex-row gap-2">
                                                                <span className="font-bold">
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </span>
                                                                <span>x</span>
                                                                <button
                                                                    onClick={() =>
                                                                        handleIncreaseProduct(
                                                                            product.id,
                                                                        )
                                                                    }
                                                                    type="button"
                                                                    className="bg-primary-600 rounded-full p-1 text-white"
                                                                >
                                                                    <PlusIcon className="h-4 w-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDecreaseProduct(
                                                                            product.id,
                                                                        )
                                                                    }
                                                                    type="button"
                                                                    className="bg-red-600 rounded-full p-1 text-white disabled:opacity-30"
                                                                >
                                                                    <MinusIcon className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {formatCurrency(product.price * product.quantity)}
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="bg-red-600 rounded-full p-1 text-white"
                                                                onClick={(e) =>
                                                                    handleRemoveProduct(
                                                                        e,
                                                                        product,
                                                                    )
                                                                }
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Step 3 checkout*/}
                    <div
                        className={`border-2 rounded mt-6 p-4 mx-auto ${currentStep === 3 ? "block" : "hidden"}`}
                    >
                        <h3>Checkout</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-2">
                                <h4>Billing</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong>Name:</strong>
                                    </div>
                                    <div>
                                        <span>
                                            {userToOrder
                                                ? userToOrder.full_name
                                                : "—"}
                                        </span>
                                    </div>
                                    <div>
                                        <strong>Email:</strong>
                                    </div>
                                    <div>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="john@example.com"
                                            error={errors.email}
                                        />
                                    </div>
                                    <div>
                                        <strong>Phone:</strong>
                                    </div>
                                    <div>
                                        <Input
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            placeholder="+1 234 567 890"
                                            error={errors.phone}
                                        />
                                    </div>
                                    <div>
                                        <strong>Address:</strong>
                                    </div>
                                    <div>
                                        <Input
                                            type="text"
                                            name="shipping_address"
                                            value={data.shipping_address}
                                            onChange={(e) =>
                                                setData(
                                                    "shipping_address",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="123 Main St, City, Country"
                                            error={errors.shipping_address}
                                        />
                                    </div>
                                    <div>
                                        <strong>Payment Method:</strong>
                                    </div>
                                    <div>
                                        <Select
                                            name="payment_method"
                                            value={data.payment_method}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value,
                                                )
                                            }
                                            options={[
                                                {
                                                    value: "cash",
                                                    label: "Cash",
                                                },
                                                {
                                                    value: "bank_transfer",
                                                    label: "Bank Transfer",
                                                },
                                            ]}
                                            error={errors.payment_method}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>Products</h4>
                                <div className="flex flex-col gap-4 my-4">
                                    {selectedProducts.map((product) => {
                                        const unitPrice = product.price;
                                        const linePrice =
                                            product.price * product.quantity;
                                        const discountedLinePrice =
                                            linePrice -
                                            linePrice * (discountValue / 100);

                                        return (
                                            <div
                                                className="border rounded-xl p-4"
                                                key={product.id}
                                            >
                                                <div className="flex flex-row flex-wrap justify-between gap-4">
                                                    <div className="flex flex-col items-end">
                                                        <span>Product</span>
                                                        {
                                                            products.data.find(
                                                                (item) =>
                                                                    item.id ===
                                                                    product.id,
                                                            )?.name
                                                        }
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span>Quantity</span>
                                                        {product.quantity}
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span>Unit price</span>
                                                        {unitPrice}
                                                    </div>
                                                    <div>
                                                        {hasDiscount &&
                                                            !planFreezeSanction ? (
                                                            <div className="flex flex-col items-end">
                                                                <span>
                                                                    Total
                                                                </span>
                                                                <span className="line-through text-gray-500">
                                                                    {formatCurrency(
                                                                        linePrice,
                                                                    )}
                                                                </span>
                                                                <span>
                                                                    {formatCurrency(
                                                                        discountedLinePrice,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-end">
                                                                <span>
                                                                    Total
                                                                </span>
                                                                <span>
                                                                    {formatCurrency(
                                                                        linePrice,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span>Points</span>
                                                        {product.points}
                                                    </div>
                                                    <div>
                                                        {pointsFreezeSanction ? (
                                                            <div className="flex flex-col items-end">
                                                                <span>
                                                                    Total Points
                                                                </span>
                                                                <span className="line-through text-gray-500">
                                                                    {product.points *
                                                                        product.quantity}
                                                                </span>
                                                                <span className="text-red-500">
                                                                    0
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-end">
                                                                <span>
                                                                    Total Points
                                                                </span>
                                                                <span>
                                                                    {product.points *
                                                                        product.quantity}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 justify-evenly">
                        <SecondaryButton
                            onClick={handleBackStep}
                            disabled={currentStep === 1}
                        >
                            Back
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            disabled={
                                currentStep !== steps.length
                                || selectedProducts.length === 0
                                || !userToOrder
                                || processing
                            }
                        >
                            {processing ? "Processing..." : "Submit Order"}
                        </PrimaryButton>
                        <SecondaryButton
                            onClick={handleNextStep}
                            disabled={currentStep === steps.length}
                        >
                            Next
                        </SecondaryButton>
                    </div>
                </Form>
            </div>
        </div>
    );
}

Create.layout = (page) => <MainLayout children={page} />;
