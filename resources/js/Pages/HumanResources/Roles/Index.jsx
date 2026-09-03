import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";

export default function Index() {

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2>Roles</h2>
            <p>Manage system roles.</p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
                <PrimaryButton>Create</PrimaryButton>
            </div>
            <Table 
            
            />
        </div>
    )
}

Index.layout = (page) => <MainLayout children={page} />