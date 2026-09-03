export default function MetricCard({
    title,
    value,
    icon: Icon,
    trend,
    description,
}) {
    const isPositiveTrend = trend >= 0;

    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
            <div>
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex flex-col items-start justify-between">
                        <p className="text-sm font-medium text-gray-500">
                            {title}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {value}
                        </p>
                        {description && (
                            <p className="mt-3 text-sm text-gray-500">
                                {description}
                            </p>
                        )}
                    </div>
                    {/* If string then <i classname=icon... else <Icon ...> */}
                    {Icon &&
                        (typeof Icon === "string" ? (
                            <div className="rounded-full bg-primary-100 p-3">
                                <i
                                    className={`h-6 w-6 text-primary-800 ${Icon}`}
                                />
                            </div>
                        ) : (
                            <div className="rounded-full bg-primary-100 p-3">
                                <Icon
                                    className="h-6 w-6 text-primary-800"
                                    aria-hidden="true"
                                />
                            </div>
                        ))}
                </div>
            </div>
        </article>
    );
}
