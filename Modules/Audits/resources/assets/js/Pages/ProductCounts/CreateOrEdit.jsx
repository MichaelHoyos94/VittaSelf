import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
    const { products, auth, costCenter } = usePage().props;

    const { data, setData, errors, post } = useForm({
        count_date: "",
        observations: "",
        counted_by: auth.user.id,
        cost_center_id: costCenter?.id,
        products: [
            {
                product_id: "",
                quantity: "",
                observations: "",
            },
        ],
    });

    console.log(costCenter);
    if (errors) {
        console.log(errors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("audits.product-counts.store"));
    };

    const addProduct = () => {
        setData("products", [
            ...data.products,
            {
                product_id: "",
                quantity: "",
                observations: "",
            },
        ]);
    };

    const removeProduct = (index) => {
        const updatedProducts = data.products.filter((_, i) => i !== index);
        setData("products", updatedProducts);
    };

    const updateProduct = (index, field, value) => {
        const updatedProducts = [...data.products];

        updatedProducts[index][field] = value;

        setData("products", updatedProducts);
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
                        {data.products.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-4 items-end"
                            >
                                <Select
                                    label="product"
                                    name={`product.${index}.product_id`}
                                    onChange={(e) =>
                                        updateProduct(
                                            index,
                                            "product_id",
                                            e.target.value,
                                        )
                                    }
                                    value={item.product_id}
                                    options={products.map((product) => ({
                                        value: product.id,
                                        label: product.name,
                                    }))}
                                />
                                <Input
                                    label="quantity"
                                    name={`products.${index}.quantity`}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateProduct(
                                            index,
                                            "quantity",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Input
                                    label="observations"
                                    name={`products.${index}.observations`}
                                    value={item.observations}
                                    onChange={(e) =>
                                        updateProduct(
                                            index,
                                            "observations",
                                            e.target.value,
                                        )
                                    }
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
                            error={errors.count_date}
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
