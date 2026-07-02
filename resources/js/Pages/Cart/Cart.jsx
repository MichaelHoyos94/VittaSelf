import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Link, router, usePage } from "@inertiajs/react";

export default function Cart() {
    const { cart, flash } = usePage().props;
    console.log(flash);
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
    return (
        <div className="bg-white p-4 rounded">
            <h2>Products in my cart</h2>
            <div>
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
                                <div className="flex flex-row flex-wrap justify-between gap-4">
                                    <div>{product.name}</div>
                                    <div className="flex flex-row gap-4">
                                        {product.pivot.quantity}
                                        <div className="flex flex-row gap-2">
                                            <button
                                                className="bg-primary-600 rounded-full p-1 text-white"
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
                                                className="bg-red-600 rounded-full p-1 text-white disabled:opacity-30"
                                            >
                                                <MinusIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {product.price * product.pivot.quantity}
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
                    <PrimaryButton>Checkout</PrimaryButton>
                </Link>
            </div>
        </div>
    );
}

Cart.layout = (page) => <MainLayout children={page} />;
