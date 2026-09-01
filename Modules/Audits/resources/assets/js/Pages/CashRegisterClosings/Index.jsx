import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";

export default function Index() {
    const { cashRegisterClosures, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage(flash.error);
        setSuccessMessage(flash.success);
        if (!flash.success && !flash.error) return;
        const timer = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.error, flash.success]);

    const columns = [
        {
            header: "#",
            accessor: "id",
        },
        {
            header: "date",
            accessor: "date",
        },
        {
            header: "Commercial Agent",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.commercial_agent.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span>{row.commercial_agent.name}</span>
                </div>
            ),
        },
        {
            header: "cash register",
            render: (row) => (
                <div className="flex flex-col">
                    <strong>{row.cash_register.name}</strong>
                    <span className="text-gray-500">
                        {row.cash_register.cost_center.name}
                    </span>
                    <span className="text-gray-500">
                        {row.cash_register.cost_center.address}
                    </span>
                </div>
            ),
        },
        {
            header: "cash",
            render: (row) => <div>{formatCurrency(row.cash)}</div>,
        },
        {
            header: "bank transfer",
            render: (row) => <div>{formatCurrency(row.bank_transfer)}</div>,
        },
        {
            header: "actions",
            render: (row) => (
                <div>
                    <Link
                        href={route("audits.cash-register-closures.show", {
                            cashRegisterClosureId: row.id,
                        })}
                    >
                        <PrimaryButton>details</PrimaryButton>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white/70 p-8 shadow-lg rounded-xl backdrop-blur-lg">
            <h2>Cash Register Closures</h2>
            <p>Check the cash registers closings and make audits.</p>
            <Table columns={columns} data={cashRegisterClosures} />
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
