import {
    ArrowLeftIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Input from "./Form/Input";

export default function Table({
    columns = [],
    data = [],
    from,
    to,
    totalResults,
    emptyText = "No data available",
    links = [],
    filterable = false,
    handleSearch = () => {},
    onPageChange = () => {},
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const onSearch = (event) => {
        event.preventDefault();
        handleSearch(searchTerm);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                {filterable && (
                    <form
                        onSubmit={onSearch}
                        className="flex w-full sm:w-auto items-start gap-2"
                    >
                        <div className="w-full sm:w-72">
                            <Input
                                name="table-search"
                                type="search"
                                value={searchTerm}
                                placeholder="Search..."
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            aria-label="Search"
                            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md bg-green-600 text-white transition duration-300 hover:bg-green-700 hover:shadow-md"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                    </form>
                )}
            </div>
            <div className="overflow-x-auto bg-white rounded-lg border border-slate-800 shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-primary-600">
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
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row[rowIndex] ?? rowIndex}
                                    className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}`}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                        >
                                            {column.render
                                                ? column.render(row)
                                                : (row[column.accessor] ??
                                                  "N/A")}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
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
                <div className="flex flex-col sm:flex-row justify-between items-center px-4">
                    {/* Center horizontal */}
                    <div>
                        <p>
                            Showing{" "}
                            <span>
                                {from} to {to} from {totalResults} results.
                            </span>
                        </p>
                    </div>
                    <div className="m-2 flex flex-row items-center justify-center space-x-2">
                        {links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => onPageChange(link.url)}
                                disabled={!link.url}
                                className={
                                    "w-8 h-8 font-bold flex items-center justify-center text-white rounded-full hover:bg-green-700 hover:scale-110 transition duration-300 disabled:opacity-50 " +
                                    (link.active
                                        ? "bg-green-700 shadow-md"
                                        : "bg-green-500")
                                }
                            >
                                {/* if number show number, else show icon */}
                                {!isNaN(link.label) ? (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <>
                                        {/* If previus left arrow, if next right arrow */}
                                        {link.label === "&laquo; Previous" && (
                                            <ArrowLeftIcon className="w-3 w-3" />
                                        )}
                                        {link.label === "Next &raquo;" && (
                                            <ArrowRightIcon className="w-3 w-3" />
                                        )}
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
