import MainLayout from "@/Layouts/MainLayout"
import { usePage } from "@inertiajs/react"

export default function Checkout() {
    const { cart, flash } = usePage().props;
    return (
        <div className="bg-white p-4 rounded">
            <h2>Checkout</h2>
            <p>Confirm the data.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-r-2">
                    <h3>Billing</h3>
                </div>
                <div>
                    <h3>Products</h3>
                </div>
            </div>
        </div>
    )
}

Checkout.layout = (page) => <MainLayout children={page}/>