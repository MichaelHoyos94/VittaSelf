import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid";
import { useForm, usePage } from "@inertiajs/react";

export default function Show() {

    const { productCount, auth } = usePage().props;

    const { data, setData, post, errors } = useForm({
        product_count_id: productCount.id,
        audited_at: "",
        audited_by: auth.user.id,
        total_expected_products: "5", //Viene del stock real del centro de costos #TODO quemado por ahora
        total_counted_products: "",
        total_difference: "",
        products_with_mismatch: "",
        products_with_observations: "",
        status: "",
        requires_recount: "",
        report: "",
    });

    console.log(errors);

    const handleSubmit = function (e) {
        e.preventDefault();
        console.log(data);
        post(route("audits.product-counts.audit"));
    };

    return (
        <div className="rounded bg-white p-4">
            <div>
                <h2>Product count</h2>
                <p>details</p>
            </div>
            <div className="grid grid-cols-2 gap-4 space-y-4">
                <div>
                    <p>Product Count</p>
                    <div className="grid grid-cols-2">
                        <div>
                            <p>
                                <strong>Count date: </strong>
                                <span>{productCount.count_date}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Counted by: </strong>
                                <span>{productCount.counted_by}</span>
                            </p>
                        </div>
                        <div className="col-span-2">
                            <div className="ml-auto rounded bg-gray-50 px-4 py-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                                        <ClipboardDocumentCheckIcon className="h-5 w-5 text-primary-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Cost center</p>
                                        <div>
                                            <strong>name</strong>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">
                                                address
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>
                                <strong>Observations: </strong>
                                {productCount.observations ? productCount.observations : "N/A"}
                            </p>
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                    <Table

                    />
                </div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <Input
                                    label={"Audit Date"}
                                    name={"audited_at"}
                                    type="date"
                                    value={data.audited_at}
                                    onChange={(e) => setData('audited_at', e.target.value)}
                                    error={errors.audited_at}
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
                                    value={data.total_counted_products}
                                    onChange={(e) => setData('total_counted_products', e.target.value)}
                                    error={errors.total_counted_products}
                                    placeholder={"Introduce the total products counted."}
                                />
                            </div>
                            <div>
                                <Input
                                    label={"Total Difference"}
                                    name={"total_difference"}
                                    type="number"
                                    value={data.total_difference}
                                    onChange={(e) => setData('total_difference', e.target.value)}
                                    error={errors.total_difference}
                                />
                            </div>
                            <div>
                                <Input
                                    label={"Products With Mismatch"}
                                    name={"products_with_mismatch"}
                                    type={"number"}
                                    value={data.products_with_mismatch}
                                    onChange={(e) => setData('products_with_mismatch', e.target.value)}
                                    error={errors.products_with_mismatch}
                                />
                            </div>
                            <div>
                                <Input
                                    label={"Products With Observations"}
                                    name={"products_with_observations"}
                                    type="number"
                                    value={data.products_with_observations}
                                    onChange={(e) => setData('products_with_observations', e.target.value)}
                                    error={errors.products_with_observations}
                                    placeholder={"How many products with observations?"}
                                />
                            </div>
                            <div>
                                <Select
                                    label={"Status"}
                                    name={"status"}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    options={[
                                        { label: "Correct", value: "CORRECT" },
                                        { label: "Incorrect", value: "INCORRECT" },
                                        { label: "Correct with issues", value: "CORRECT_WITH_ISSUES" },
                                    ]}
                                />
                            </div>
                            <div className="col-span-2">
                                <Select
                                    label={"Requires Recount"}
                                    name={"requires_recount"}
                                    value={data.requires_recount}
                                    onChange={(e) => setData('requires_recount', e.target.value)}
                                    error={errors.requires_recount}
                                    options={[
                                        { label: "Yes", value: 1 },
                                        { label: "No", value: 0 },
                                    ]}
                                />
                            </div>
                            <div className="col-span-2">
                                <TextArea 
                                    label={"Report"}
                                    name={"report"}
                                    error={errors.report}
                                    placeholder={"This product count shows that ..."}
                                    value={data.report}
                                    onChange={(e) => setData("report", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <PrimaryButton
                                type="submit"
                            >
                                Send
                            </PrimaryButton>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <MainLayout children={page} />;
