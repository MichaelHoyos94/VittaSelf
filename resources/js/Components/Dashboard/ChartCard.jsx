export default function ChartCard({ title, description, children }) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <header className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </header>

            <div className="h-80">{children}</div>
        </section>
    );
}
