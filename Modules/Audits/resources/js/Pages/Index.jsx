import MainLayout from "@/Layouts/MainLayout";

export default function Index() {
    return (
        <div className="p-4 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Audits Module</h1>
            <p>Welcome to the Audits module! This is the index page.</p>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;