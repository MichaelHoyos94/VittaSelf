import PrimaryButton from "@/Components/PrimaryButton";

export default function Cart() {
    return (
        <div className="bg-white p-4 rounded">
            <h2>
                Products in my cart
            </h2>
            <div>
                {/* Buttons */}
            </div>
            <div className="flex flex-col">
                {/* Card */}
                <div className="border rounded-xl p-4">
                    <div className="flex">
                        <div>
                            Product Info
                        </div>
                        <div>
                            Cantidad + boton
                        </div>
                        <div>
                            Precio
                        </div>
                        <div>
                            Boton eliminar
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton>
                    Checkout
                </PrimaryButton>
            </div>
        </div>
    )
}