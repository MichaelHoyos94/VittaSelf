import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";
export default function Cart() {
    const { cart, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const [errorMessage, setErrorMessage] = useState(flash.error);
    const handleIncrese = function (productId) {
        router.post(route("carts.increse-product"), {
            product_id: productId,
        });
    };
    const handleDecrese = function (productId) {
        router.post(route("carts.decrese-product"), {
            product_id: productId,
        });
    };
    const handleEmptyCart = function () {
        router.post(route("carts.empty-cart"));
    };
    const handleDeleteProduct = function (productId) {
        router.post(route("carts.remove-product"), {
            product_id: productId,
        });
    };
    useEffect(() => {
        setErrorMessage(flash.error);
        setSuccessMessage(flash.success);
        if (!flash.success && !flash.error) return;
        const timer = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.error, flash.success])

    function ProductThumbnail({ product }) {
        const [hasError, setHasError] = useState(false);
        const hasCover = product.cover && product.cover !== 'product.jpg';

        if (!hasCover || hasError) {
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800">
                    {product.name?.charAt(0)?.toUpperCase() ?? 'P'}
                </div>
            );
        }

        return (
            <img
                src={`/storage/${product.cover.replace(/^\/+/, '')}`}
                alt={`Cover of ${product.name}`}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
                onError={() => setHasError(true)}
            />
        );
    }
    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg">
            <h2>Products in my cart</h2>
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
            <div className="mt-4">
                <SecondaryButton
                    disabled={cart.products.length === 0}
                    onClick={handleEmptyCart}
                >
                    empty cart
                </SecondaryButton>
            </div>
            <div className="flex flex-col gap-4 my-4">
                {cart.products.length === 0 ? (
                    <p>The cart is empty.</p>
                ) : (
                    <>
                        {cart.products.map((product) => (
                            <div
                                className="border rounded-xl p-4"
                                key={product.id}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <ProductThumbnail product={product} />
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-800">
                                                {product.name}
                                            </p>
                                            <p className="max-w-xs truncate text-xs text-gray-500">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        {product.pivot.quantity}
                                        <button
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white"
                                            onClick={() =>
                                                handleIncrese(product.id)
                                            }
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDecrese(product.id)
                                            }
                                            disabled={
                                                product.pivot.quantity <= 1
                                            }
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white disabled:opacity-30"
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div>
                                        {formatCurrency(product.price * product.pivot.quantity)}
                                    </div>
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                            className="bg-red-600 rounded-full p-1 text-white"
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
            <div>
                <Link href={route("orders.checkout")}>
                    <PrimaryButton disabled={cart.products.length === 0}>
                        Checkout
                    </PrimaryButton>
                </Link>
            </div>
        </div>
    );
}

Cart.layout = (page) => <MainLayout children={page} />;
