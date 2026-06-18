import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, errors, reset, post } = useForm({
        count_date: "",
        observations: "",
        product_quantities: [
            {
                product_id: "",
                quantity: "",
                observations: "",
            },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    const addProduct = () => {
        setData("product_quantities", [
            ...data.product_quantities,
            {
                product_id: "",
                quantity: "",
                observations: "",
            },
        ]);
    };

    const removeProduct = (index) => {
        const updatedProducts = data.product_quantities.filter(
            (_, i) => i !== index,
        );
        setData("product_quantities", updatedProducts);
    };

    const updateProduct = (index, field, value) => {
        const updatedProducts = [...data.product_quantities];

        updatedProducts[index][field] = value;

        setData("product_quantities", updatedProducts);
    };

    return (
        <div className="rounded bg-white p-4">
            <div>
                <h2>New product count</h2>
                <p>Introduce the products and quantity in the cost center</p>
            </div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        {data.product_quantities.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-4 items-end"
                            >
                                <Select
                                    label="product"
                                    name={`product_quantities.${index}.product_id`}
                                />
                                <Input 
                                    label="quantity" 
                                    onChange={(e) => updateProduct(index, "quantity", e.target.value)}
                                />
                                <Input 
                                    label="observations" 
                                    onChange={(e) => updateProduct(index, "observations", e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeProduct(index)}
                                    className="text-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <PrimaryButton type="button" onClick={addProduct}>
                            + Add product
                        </PrimaryButton>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="date"
                            label="Count Date"
                            name="count_date"
                            value={data.count_date}
                            onChange={(e) =>
                                setData("count_date", e.target.value)
                            }
                        />
                        <TextArea
                            label="Observations"
                            name="observations"
                            value={data.observations}
                            onChange={(e) =>
                                setData("observations", e.target.value)
                            }
                        />
                    </div>
                    <PrimaryButton type="submit">Send</PrimaryButton>
                </Form>
            </div>
        </div>
    );
}

Create.layout = (page) => <MainLayout children={page} />;
