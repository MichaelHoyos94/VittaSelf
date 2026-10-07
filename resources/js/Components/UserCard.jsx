export default function UserCard({ user }) {
    if (!user) {
        return null;
    }

    const displayName = user.full_name || user.name;

    return (
        <div className="rounded-lg border border-primary-100 bg-primary-50/60 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                    {displayName?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                        {displayName}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                        {user.email}
                    </p>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                    <p className="text-xs font-medium uppercase text-gray-400">
                        EUI Code
                    </p>
                    <p className="font-medium text-gray-700">
                        {user.eui_code || 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium uppercase text-gray-400">
                        Document
                    </p>
                    <p className="font-medium text-gray-700">
                        {user.document_number || 'N/A'}
                    </p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs font-medium uppercase text-gray-400">
                        Plan
                    </p>
                    <p className="font-medium text-gray-700">
                        {user.plan?.name || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
}
