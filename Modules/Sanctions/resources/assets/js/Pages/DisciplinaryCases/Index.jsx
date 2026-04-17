import MainLayout from "@/Layouts/MainLayout"

export default function Index() {
    return (
        <div className="p-4 rounded bg-white shadow">
            <h1>Hello from Disciplinary Cases view</h1>
        </div>
    )
}

Index.layout = page => <MainLayout children={page} />
