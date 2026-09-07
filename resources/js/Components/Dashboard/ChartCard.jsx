export default function ChartCard({ title, description, children }) {
    return (
        <section className="min-w-0 rounded-xl border border-primary-200 bg-white p-4 sm:p-6 shadow-sm">
            <header className="mb-5">
                <h2 className="text-lg font-semibold text-primary-900">{title}</h2>

                {description && (
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                )}
            </header>

            <div className="h-80">{children}</div>
        </section>
    );
}
