export default function Select({
    label,
    name,
    value,
    onChange,
    error,
    placeholder = "Select an option",
    options = []
}) {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
                {label}
            </label>}
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring " + (error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500")}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}