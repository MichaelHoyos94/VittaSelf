import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";

export default function Index() {
    const { products, flash } = usePage().props;
    const handleAddToCart = function (productId) {
        router.post(route('carts.add-product'), {
            product_id: productId
        });
    }
    return (
        <div className="bg-white p-4 rounded">
            <h2>Products</h2>
            <div>
                {flash.error && (
                    <div>
                        {flash.error}
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
                            <div className="flex gap-4 justify-between">
                                <PrimaryButton
                                    onClick={() => handleAddToCart(product.id)}
                                >Add to cart</PrimaryButton>
                                <SecondaryButton>
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

Index.layout = (page) => <MainLayout children={page}/>