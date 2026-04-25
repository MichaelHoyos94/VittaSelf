import { ArrowLeftIcon, ArrowRightIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Table({
    columns = [],
    data = [],
    emptyText = 'No data available',
    links = [],
    onPageChange = () => { }
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
                                    className={`hover:bg-gray-200 hover:border-b-gray-400 transition duration-300 cursor-pointer ${rowIndex % 2 === 0 ? 'bg-slate-50' : 'bg-slate-200'}`}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                        >
                                            {column.render
                                                ? column.render(row)
                                                : row[column.accessor]}
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
            <div className="m-2 flex flex-row items-center justify-center space-x-2">
                {links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(link.url)}
                        disabled={!link.url}
                        className={"w-8 h-8 font-bold flex items-center justify-center text-white rounded-full hover:bg-green-700 hover:scale-110 transition duration-300 disabled:opacity-50 " + (link.active ? "bg-green-700 shadow-md" : "bg-green-500")}
                    >
                        {/* if number show number, else show icon */}
                        {!isNaN(link.label) ? (
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        ) : (
                            <>
                                {/* If previus left arrow, if next right arrow */}
                                {link.label === '&laquo; Previous' && <ArrowLeftIcon className="w-3 w-3"/>}
                                {link.label === 'Next &raquo;' && <ArrowRightIcon className="w-3 w-3" />}
                            </>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
