import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const { products, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash?.success);
    const [errorMessage, setErrorMessage] = useState(flash?.error);

    const handleAddToCart = function (productId) {
        router.post(route('carts.add-product'), {
            product_id: productId
        });
    }

    useEffect(() => {
        setErrorMessage(flash?.error);
        setSuccessMessage(flash?.success);

        if (!flash?.success && !flash?.error) return;

        const timer = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash])

    return (
        <div className="bg-white p-4 rounded">
            <h2>Products</h2>
            <div>
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{successMessage}</span>
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-8">
                {/* Card per product */}
                {products.map((product) => (
                    <div
                        className="border rounded-xl border-2 p-4 transform transition duration-100 hover:scale-110"
                        key={product.id}
                    >
                        <div>
                            <img alt="Product image" />
                            <h3>{product.name}</h3>
                            <p>
                                {product.description}
                            </p>
                            <span>${product.price}</span><br />
                            <strong>{product.points} points</strong>
                            <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
                                <PrimaryButton
                                    className="w-full justify-center text-center sm:flex-1"
                                    onClick={() => handleAddToCart(product.id)}
                                >Add to cart</PrimaryButton>
                                <SecondaryButton className="w-full justify-center text-center sm:flex-1">
                                    Add to favorites
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />
