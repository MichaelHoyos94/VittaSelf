import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="flex h-dvh">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4 bg-gradient-to-tr from-slate-100 to-slate-300 p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}