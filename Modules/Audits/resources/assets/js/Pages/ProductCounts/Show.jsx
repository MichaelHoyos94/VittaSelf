import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import MainLayout from "@/Layouts/MainLayout";
import { useForm } from "@inertiajs/react";

export default function Show() {
    const handleSubmit = function () {};

    const { data, post, errors } = useForm({});

    return (
        <div className="rounded bg-white p-4">
            <div>
                <h2>Product count</h2>
                <p>details</p>
            </div>
            <div className="grid grid-cols-2">
                <div>INFO {/* #TODO */}</div>
                <div className="">
                    <Form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <Input
                                    label={"Count date"}
                                    name={"counted_at"}
                                    type="date"
                                    value={""}
                                    onChange={""}
                                    error={""}
                                    placeholder={""}
                                />
                            </div>
                            <div>
                                <p>Total expected products: 5</p>
                            </div>
                            <div>
                                <Input 
                                    label={"Total Counted Products"}
                                    name={"total_counted_products"}
                                    type="number"
                                    value={""}
                                    onChange={errors.total_counted_products}
                                    placeholder={"Introduce the total products counted."}
                                />
                            </div>
                            <div>
                                <Input 
                                    label={"Total Difference"}
                                    name={"total_difference"}
                                    type="number"
                                    value={""}
                                    onChange={""}
                                    error={errors.total_difference}
                                />
                            </div>
                            <div>
                                <Input 
                                    label={"Products With Mismatch"}
                                    name={"products_with_mismatch"}
                                    type={"number"}
                                    value={""}
                                    onChange={""}
                                    error={errors.products_with_mismatch}
                                />
                            </div>
                            <div>
                                <Input 
                                    label={"Products With Observations"}
                                    name={"products_with_observations"}
                                    type="number"
                                    value={""}
                                    onChange={""}
                                    error={errors.products_with_observations}
                                    placeholder={"How many products with observations?"}
                                />
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <MainLayout children={page} />;
