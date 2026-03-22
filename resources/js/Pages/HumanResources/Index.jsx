import MainLayout from "@/Layouts/MainLayout";

export default function Index() {
    return (
        <div className="p-4 bg-white rounded-lg">
            <h1 className="text-green-500">Human Resources</h1>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;