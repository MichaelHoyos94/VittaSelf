
export default function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder
}) {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>}
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring" + (error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500")}
            >
            </input>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}