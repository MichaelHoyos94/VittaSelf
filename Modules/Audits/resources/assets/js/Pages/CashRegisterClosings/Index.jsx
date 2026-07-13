import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";

export default function Index()
{
    return (
        <div className="p-4 bg-white rounded-xl">
            <h2>Cash Register Closings</h2>
            <p>Check the cash registers closings and make audits.</p>
            {/* Buttons */}
            <div className="flex gap-4 mb-4">

            </div>
            <Table />
        </div>
    )
}

Index.layout = (page) => <MainLayout children={page}/>