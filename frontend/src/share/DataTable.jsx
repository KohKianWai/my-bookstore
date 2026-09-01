function DataTable({
    columns,
    data,
    onAdd,
    onUpdate,
    onDelete,
    entity,
}) {
    return (
        <div className="p-10">

            <div className="border-2 rounded-xl overflow-hidden p-6">
                {/* Top section */}
            <div className="relative flex items-center justify-end mb-4">

                <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">
                    {entity}
                </h2>

                {onAdd && (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onAdd}
                    >
                        + Add {entity}
                    </button>
                )}

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>
                        <tr className="text-center text-base-content/60">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>


                    {/* Body */}
                    <tbody>

                        {data.length === 0 ? (

                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-20"
                                >
                                    <div className="flex flex-col items-center">

                                        <p className="text-base-content/60 mt-2">
                                            No {entity} found.
                                        </p>

                                    </div>
                                </td>
                            </tr>

                        ) : (

                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-base-200 text-center"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="px-4 py-4"
                                        >
                                            {column.key === "action" ? (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-neutral"
                                                        onClick={() => onUpdate(row)}
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-error"
                                                        onClick={() => onDelete(row)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                column.render
                                                    ? column.render(row)
                                                    : row[column.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))

                        )}

                    </tbody>

                </table>

            </div>
            </div>

        </div>
    );
}

export default DataTable;