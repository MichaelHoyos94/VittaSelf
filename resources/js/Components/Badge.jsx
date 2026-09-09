
export default function Badge({ type = "info", text = "", ...props }) {

    return (
        <>
            <div
                className={`inline-flex items-center px-3.5 py-0.5 rounded-full shadow-sm text-xs font-medium ${type === "info"
                    ? "bg-blue-100 text-blue-800"
                    : type === "success"
                        ? "bg-green-100 text-green-800"
                        : type === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : type === "error"
                                ? "bg-red-100 text-red-800"
                                : type === "secondary"
                                    ? "bg-primary-50 border border-primary-800 text-primary-800"
                                    : "bg-gray-100 text-gray-800"
                    }`}
                {...props}
            >
                {text && <span>{text}</span>}
            </div>
        </>
    )
}