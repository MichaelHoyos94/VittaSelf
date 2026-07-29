import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import MainLayout from "@/Layouts/MainLayout"
import { useForm, usePage } from "@inertiajs/react"
import formatCurrency from "@/Utils/formatCurrency";

export default function Show() {

    const { cashRegisterClosure } = usePage().props;

    console.log(cashRegisterClosure);

    const { data, setData, post, processing, errors } = useForm({
        expected_cash: cashRegisterClosure.cash_register?.cash,
        counted_cash: '',
        expected_bank_transfer: cashRegisterClosure.cash_register?.bank_transfer,
        counted_bank_transfer: '',
        observations: '',
        report: '',
        status: '',
        cash_register_closure_id: cashRegisterClosure.id,
    });

    console.log(errors);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('audits.cash-register-closure.audit'));
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <h2>Cash Register Closure Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-4">
                <div>
                    <p>Cash Register Closure</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <strong>Date:</strong>
                        <span>{cashRegisterClosure.date}</span>
                        <strong>Cash Register:</strong>
                        <span>{cashRegisterClosure.cash_register.name}</span>
                        <strong>Commercial Agent:</strong>
                        <span>{cashRegisterClosure.commercial_agent.full_name}</span>
                        <strong>Cash Reported:</strong>
                        <span>{formatCurrency(cashRegisterClosure.cash)}</span>
                        <strong>Bank Transfer Reported:</strong>
                        <span>{formatCurrency(cashRegisterClosure.bank_transfer)}</span>
                    </div>
                </div>
                <div>
                    <p>Audit Cash Register Closure</p>
                    <Form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    readonly
                                    label={"Expected Cash"}
                                    value={data.expected_cash}
                                />
                            </div>
                            <div>
                                <Input
                                    label={"Counted Cash"}
                                    value={data.counted_cash}
                                    onChange={(e) => setData('counted_cash', e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    readonly
                                    label={"Expected Bank Transfer"}
                                    value={data.expected_bank_transfer}
                                />
                            </div>
                            <div>
                                <Input
                                    label={"Counted Bank Transfer"}
                                    value={data.counted_bank_transfer}
                                    onChange={(e) => setData('counted_bank_transfer', e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <TextArea
                                    label={"Observations"}
                                    value={data.observations}
                                    onChange={(e) => setData('observations', e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <TextArea
                                    label={"Report"}
                                    value={data.report}
                                    onChange={(e) => setData('report', e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Select
                                    label={"Status"}
                                    options={[
                                        { value: 'approved', label: 'Approved' },
                                        { value: 'rejected', label: 'Rejected' }
                                    ]}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-end">
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
    )
}

Show.layout = (page) => <MainLayout children={page} />