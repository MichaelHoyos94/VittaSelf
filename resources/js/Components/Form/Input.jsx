
export default function Input({
    label,
    name,
    disabled = false,
    type = "text",
    value,
    onChange,
    error,
    placeholder
}) {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
                {label}
            </label>}
            <input 
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring placeholder:text-gray-300 " + (disabled ? "opacity-20 cursor-not-allowed" : "") + (error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500")}
            >
            </input>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}