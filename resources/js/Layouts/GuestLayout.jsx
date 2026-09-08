import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-24 font-sans text-slate-900 sm:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(104,219,169,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,105,72,0.11),transparent_36%)]" />

            <main className="relative z-10 w-full max-w-[420px] rounded-xl bg-white p-8 shadow-[0_12px_24px_-8px_rgba(15,23,42,0.08),0_4px_12px_-4px_rgba(15,23,42,0.04)]">
                <div>{children}</div>
            </main>

            <footer className="absolute bottom-0 left-0 z-10 flex w-full flex-col items-center justify-center gap-3 px-6 py-6 text-center text-xs text-slate-500 sm:flex-row sm:gap-4">
                <p>&copy; {new Date().getFullYear()} VittaSelf Enterprise. All rights reserved.</p>
                <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block" />
                <div className="flex gap-4">
                    <a href="#" className="transition hover:text-primary-700">Privacy Policy</a>
                    <a href="#" className="transition hover:text-primary-700">Terms of Service</a>
                    <a href="#" className="transition hover:text-primary-700">Support</a>
                </div>
            </footer>
        </div>
    );
}
