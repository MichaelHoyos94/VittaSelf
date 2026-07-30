import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";

export default function Checkout() {
    const { cart, user, flash, sanctions } = usePage().props;
    const planFreezeSanction = sanctions.some(
        (sanction) => sanction.FREEZE_PLAN,
    );
    const pointsFreezeSanction = sanctions.some(
        (sanction) => sanction.FREEZE_POINTS,
    );
    const discountBenefit = user.plan?.benefits?.find(
        (benefit) => benefit.type === "discount",
    );
    const discountValue = Number(discountBenefit?.value ?? 0);
    const hasDiscount = discountValue > 0;
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const [errorMessage, setErrorMessage] = useState(flash.error);
    const { data, setData, post, processing, errors } = useForm({
        user_id: user.id,
        email: user.email,
        phone: user.phone,
        shipping_address: user.address ? user.address : "—",
        payment_method: "",
        products: cart.products,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("orders.store"), {
            onSuccess: () => {
                console.log("Order created successfully");
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };
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
    return (
        <div className="bg-white p-4 rounded">
            <h2>Checkout</h2>
            <p>Confirm the data.</p>
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
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                {planFreezeSanction && (
                    <div
                        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            Your plan is currently frozen due to a sanction.
                            Benefits will not be available until the freeze is
                            lifted.
                        </span>
                    </div>
                )}
                {pointsFreezeSanction && (
                    <div
                        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            Your points are currently frozen due to a sanction.
                            Points will not increment in this order.
                        </span>
                    </div>
                )}
            </div>
            <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-2">
                        <h3>Billing</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <strong>Name:</strong>
                            </div>
                            <div>
                                <span>{user.full_name}</span>
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
                    <div className="p-2">
                        <h3>Products</h3>
                        <div className="flex flex-col gap-4 my-4">
                            {cart.products.map((product) => {
                                const unitPrice = product.price;
                                const linePrice =
                                    product.price * product.pivot.quantity;
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
                                                {product.name}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span>Quantity</span>
                                                {product.pivot.quantity}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span>Unit price</span>
                                                {formatCurrency(unitPrice)}
                                            </div>
                                            <div>
                                                {hasDiscount &&
                                                !planFreezeSanction ? (
                                                    <div className="flex flex-col items-end">
                                                        <span>Total</span>
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
                                                        <span>Total</span>
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
                                                        <span>Points</span>
                                                        <span className="text-red-500">
                                                            0
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-end">
                                                        <span>Total Points</span>
                                                        <span>
                                                            {product.points * product.pivot.quantity}
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
                    <div className="col-span-1 sm:col-span-2">
                        <div className="flex flex-wrap justify-evenly gap-2 mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? "sending..." : "send"}
                            </PrimaryButton>
                            <SecondaryButton type="button">
                                Cancel
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

Checkout.layout = (page) => <MainLayout children={page} />;
