import { EyeIcon } from "@heroicons/react/24/outline";

export default function Table({
    columns = [],
    data = [],
    emptyText = 'No data available',
    rowKey = 'id',
}) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-600">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-500">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ?
                        (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row[rowIndex] ?? rowIndex}
                                    className="hover:bg-gray-200 hover:border-b-gray-400"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                        >
                                            {column.render
                                                ? column.render(row)
                                                : row[column.accessor]}
                                            {column.details == true && (
                                                <button className="ml-2 bg-transparent rounded-full transform transition-transform duration-300 hover:scale-110">
                                                    <EyeIcon className="h-3 w-3 text-gray-700 hover:text-gray-900" />
                                                </button>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) :
                        (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    {emptyText}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
