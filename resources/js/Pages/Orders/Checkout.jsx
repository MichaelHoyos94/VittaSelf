import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Checkout() {
    const { cart, auth, flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        email: auth.user.email,
        phone: auth.user.phone,
        shipping_address: auth.user.address ? auth.user.address : "—",
        payment_method: '',
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
    }
    return (
        <div className="bg-white p-4 rounded">
            <h2>Checkout</h2>
            <p>Confirm the data.</p>
            <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-r-2 p-2">
                        <h3>Billing</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <strong>Name:</strong>
                            </div>
                            <div>
                                <span>{auth.user.full_name}</span>
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
                                        setData("shipping_address", e.target.value)
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
                                    options={
                                        [
                                            { value: "", label: "Select" },
                                            {
                                                value: "cash",
                                                label: "Cash",
                                            },
                                            {
                                                value: "bank_transfer",
                                                label: "Bank Transfer",
                                            },
                                        ]
                                    }
                                    error={errors.payment_method}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Products</h3>
                        <div className="flex flex-col gap-4 my-4">
                            {cart.products.map((product) => (
                                <div
                                    className="border rounded-xl p-4"
                                    key={product.id}
                                >
                                    <div className="flex flex-row flex-wrap justify-between gap-4">
                                        <div>{product.name}</div>
                                        <div className="flex flex-row gap-4">
                                            {product.pivot.quantity}
                                        </div>
                                        <div>
                                            {product.price *
                                                product.pivot.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-wrap justify-evenly gap-2 mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Send
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
