import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="flex h-dvh overflow-hidden">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header />
                <main className="min-h-0 flex-1 overflow-auto bg-gradient-to-tr from-slate-100 to-slate-300 p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
