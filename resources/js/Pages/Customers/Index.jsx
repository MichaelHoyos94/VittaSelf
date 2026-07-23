import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Index() {
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2>Customers</h2>
            <p>Manage customers.</p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
                <Link>
                    <PrimaryButton>create</PrimaryButton>
                </Link>
                <SecondaryButton>export</SecondaryButton>
            </div>
            <Table 
            
            />
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
