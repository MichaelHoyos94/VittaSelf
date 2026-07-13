import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";

export default function Index()
{
    return (
        <div className="p-4 rounded-xl bg-white">
            <h2>Cash Registers</h2>
            <p>Manage and assign cash registers.</p>
            {/* Buttons */}
            <div className="flex gap-4 mb-4">
                <PrimaryButton >
                    Create
                </PrimaryButton>
            </div>
            <Table />
        </div>
    )
}

Index.layout = (page) => <MainLayout children={page}/>