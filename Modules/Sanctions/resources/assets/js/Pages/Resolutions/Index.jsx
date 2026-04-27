import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { resolutions } = usePage().props;
    console.log(resolutions);
    const columns = [
        
    ]
    return (
        <div className="p-4 rounded bg-white shadow">
            <div>
                <h1>Resolutions history</h1>
                <p>Resolutions history</p>
            </div>
            <Table 

            />
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
