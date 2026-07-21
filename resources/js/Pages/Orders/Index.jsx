import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import { usePage } from "@inertiajs/react"

export default function Index()
{

    const { orders } = usePage().props;

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2>Orders</h2>
            <p>Orders History</p>
            <div className="flex flex-wrap gap-4">
                <SecondaryButton>export</SecondaryButton>
            </div>
            <Table 
                data={orders.data}
            />
        </div>
    )
}