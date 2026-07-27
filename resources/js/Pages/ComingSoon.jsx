import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    ClockIcon,
    SparklesIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default function ComingSoon({ feature }) {
    return (
        <>
            <Head title={`${feature.title} — Coming soon`} />

            <section className="relative isolate flex min-h-full items-center justify-center overflow-hidden rounded-3xl border border-white/80 bg-white px-6 py-12 shadow-sm sm:px-10">
                <div
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-200/60 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-primary-100/80 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
                    <div className="text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800">
                            <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                            Something good is growing
                        </span>

                        <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                            {feature.title}
                        </p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            We&apos;re working on it
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 lg:mx-0 sm:text-lg">
                            {feature.description}
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                            <Link
                                href="/dashboard"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
                            >
                                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                                Back to dashboard
                            </Link>
                            <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500">
                                <ClockIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                Available soon
                            </span>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-sm" aria-hidden="true">
                        <div className="relative aspect-square">
                            <div className="absolute inset-5 rounded-[2.5rem] border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-primary-100 shadow-[0_24px_70px_-30px_rgba(35,113,67,0.45)]" />
                            <div className="absolute left-0 top-16 flex h-16 w-16 -rotate-6 items-center justify-center rounded-2xl border border-primary-200 bg-white shadow-lg">
                                <SparklesIcon className="h-8 w-8 text-primary-500" />
                            </div>
                            <div className="absolute bottom-14 right-0 flex h-16 w-16 rotate-6 items-center justify-center rounded-2xl border border-primary-200 bg-white shadow-lg">
                                <CheckCircleIcon className="h-8 w-8 text-primary-700" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary-700 shadow-[0_20px_50px_-18px_rgba(40,143,82,0.75)] ring-[14px] ring-primary-200/60">
                                    <WrenchScrewdriverIcon className="h-20 w-20 text-white" />
                                </div>
                            </div>
                            <span className="absolute right-8 top-9 h-3 w-3 rounded-full bg-primary-400" />
                            <span className="absolute bottom-8 left-16 h-5 w-5 rounded-full border-4 border-primary-300" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

ComingSoon.layout = (page) => <MainLayout>{page}</MainLayout>;
