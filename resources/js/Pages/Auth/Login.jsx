import { useEffect } from 'react';
import {
    ArrowRightIcon,
    EnvelopeIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => reset('password');
    }, []);

    const submit = (event) => {
        event.preventDefault();
        post(route('login'));
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-24 font-sans text-slate-900 sm:px-8">
            <Head title="Log in" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(104,219,169,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,105,72,0.11),transparent_36%)]" />

            <main className="relative z-10 w-full max-w-[420px] rounded-xl bg-white p-8 shadow-[0_12px_24px_-8px_rgba(15,23,42,0.08),0_4px_12px_-4px_rgba(15,23,42,0.04)]">
                <div className="mb-8 flex flex-col items-center text-center">
                    <Link href="/" aria-label="VittaSelf home" className="mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2">
                        <img
                            src="/images/logo/logo2.png"
                            alt="VittaSelf"
                            className="h-16 w-16 rounded-lg object-contain shadow-sm"
                        />
                    </Link>
                    <p className="text-sm text-slate-600">Welcome back. Please enter your details.</p>
                </div>

                {status && (
                    <div className="mb-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase text-slate-700">
                            Email address
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                required
                                placeholder="name@vittaself.com"
                                onChange={(event) => setData('email', event.target.value)}
                                className="h-11 w-full rounded border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10"
                            />
                        </div>
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-xs font-medium uppercase text-slate-700">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                onChange={(event) => setData('password', event.target.value)}
                                className="h-11 w-full rounded border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10"
                            />
                        </div>
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(event) => setData('remember', event.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-700"
                            />
                            Remember me
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-primary-700 hover:text-primary-800 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded bg-primary-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? 'Signing in...' : 'Sign in'}
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </form>
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
