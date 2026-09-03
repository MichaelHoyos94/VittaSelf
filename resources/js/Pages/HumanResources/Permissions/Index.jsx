import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useAuthorization from "@/Hooks/useAuthorization";
import MainLayout from "@/Layouts/MainLayout";
import { useForm, usePage } from "@inertiajs/react";
import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";

const formatName = (name) =>
    name
        .split(/[.-]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

export default function Index() {
    const { roles = [], permissions = [], flash = {} } = usePage().props;
    const { can } = useAuthorization();
    const canAssignPermissions = can("roles.assign");
    const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id ?? null);
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        permissions: roles[0]?.permission_ids ?? [],
    });

    const selectedRole =
        roles.find((role) => role.id === selectedRoleId) ?? null;

    useEffect(() => {
        if (!selectedRole) {
            return;
        }

        setData("permissions", selectedRole.permission_ids);
        clearErrors();
    }, [selectedRoleId, roles]);

    const permissionGroups = useMemo(
        () =>
            permissions.reduce((groups, permission) => {
                const group = permission.name.split(".")[0];
                groups[group] = [...(groups[group] ?? []), permission];
                return groups;
            }, {}),
        [permissions],
    );

    const selectedPermissions = new Set(data.permissions);
    const originalPermissions = [...(selectedRole?.permission_ids ?? [])].sort(
        (a, b) => a - b,
    );
    const currentPermissions = [...data.permissions].sort((a, b) => a - b);
    const isDirty =
        JSON.stringify(originalPermissions) !==
        JSON.stringify(currentPermissions);

    const togglePermission = (permissionId) => {
        setData(
            "permissions",
            selectedPermissions.has(permissionId)
                ? data.permissions.filter((id) => id !== permissionId)
                : [...data.permissions, permissionId],
        );
    };

    const toggleGroup = (groupPermissions) => {
        const groupIds = groupPermissions.map((permission) => permission.id);
        const allSelected = groupIds.every((id) =>
            selectedPermissions.has(id),
        );

        setData(
            "permissions",
            allSelected
                ? data.permissions.filter((id) => !groupIds.includes(id))
                : [...new Set([...data.permissions, ...groupIds])],
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        put(
            route("human-resources.permissions.update", {
                role: selectedRole.id,
            }),
            { preserveScroll: true },
        );
    };

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2 sm:p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Role permissions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Select a role and define what it can do in the system.
                </p>
            </div>

            {flash.success && (
                <div
                    className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                    role="alert"
                >
                    {flash.success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    <aside className="overflow-hidden rounded-xl border border-slate-200 lg:col-span-1">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <h3 className="text-sm font-semibold text-slate-800">
                                Roles
                            </h3>
                        </div>
                        <div className="space-y-1 p-2">
                            {roles.map((role) => {
                                const isSelected = role.id === selectedRoleId;

                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedRoleId(role.id)
                                        }
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                                            isSelected
                                                ? "bg-primary-100 font-semibold text-primary-800"
                                                : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        <ShieldCheckIcon className="h-5 w-5 shrink-0" />
                                        <span className="min-w-0 flex-1">
                                            {formatName(role.name)}
                                        </span>
                                        {isSelected && (
                                            <CheckIcon className="h-4 w-4 shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <section className="rounded-xl border border-slate-200 lg:col-span-2">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">
                                    {selectedRole
                                        ? formatName(selectedRole.name)
                                        : "Permissions"}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {data.permissions.length} of{" "}
                                    {permissions.length} selected
                                </p>
                            </div>
                            {selectedRole?.is_editable &&
                                canAssignPermissions && (
                                <div className="flex gap-3 text-xs font-semibold">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData(
                                                "permissions",
                                                permissions.map(
                                                    (permission) =>
                                                        permission.id,
                                                ),
                                            )
                                        }
                                        className="text-primary-700 hover:text-primary-900"
                                    >
                                        Select all
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData("permissions", [])
                                        }
                                        className="text-slate-500 hover:text-slate-800"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>

                        {!selectedRole ? (
                            <p className="p-6 text-sm text-slate-500">
                                There are no roles to configure.
                            </p>
                        ) : (
                            <div className="grid gap-4 p-4 sm:grid-cols-2">
                                {!selectedRole.is_editable && (
                                    <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 sm:col-span-2">
                                        The super administrator has full access
                                        by definition, so its permissions
                                        cannot be changed.
                                    </div>
                                )}

                                {Object.entries(permissionGroups).map(
                                    ([group, groupPermissions]) => {
                                        const selectedCount =
                                            groupPermissions.filter(
                                                (permission) =>
                                                    selectedPermissions.has(
                                                        permission.id,
                                                    ),
                                            ).length;

                                        return (
                                            <fieldset
                                                key={group}
                                                className="rounded-lg border border-slate-200 p-4"
                                                disabled={
                                                    !selectedRole.is_editable ||
                                                    !canAssignPermissions
                                                }
                                            >
                                                <div className="mb-3 flex items-center justify-between gap-3">
                                                    <legend className="text-sm font-semibold text-slate-800">
                                                        {formatName(group)}
                                                    </legend>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleGroup(
                                                                groupPermissions,
                                                            )
                                                        }
                                                        className="text-xs font-medium text-primary-700 hover:text-primary-900 disabled:cursor-not-allowed disabled:text-slate-400"
                                                    >
                                                        {selectedCount ===
                                                        groupPermissions.length
                                                            ? "Clear group"
                                                            : "Select group"}
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {groupPermissions.map(
                                                        (permission) => (
                                                            <label
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50 has-[:disabled]:cursor-not-allowed"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedPermissions.has(
                                                                        permission.id,
                                                                    )}
                                                                    onChange={() =>
                                                                        togglePermission(
                                                                            permission.id,
                                                                        )
                                                                    }
                                                                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                                                />
                                                                <span>
                                                                    {formatName(
                                                                        permission.name.split(
                                                                            ".",
                                                                        )[1],
                                                                    )}
                                                                </span>
                                                            </label>
                                                        ),
                                                    )}
                                                </div>
                                            </fieldset>
                                        );
                                    },
                                )}
                            </div>
                        )}
                    </section>
                </div>

                {(errors.permissions || errors.role) && (
                    <p className="mt-4 text-sm text-red-600">
                        {errors.permissions || errors.role}
                    </p>
                )}

                <div className="mt-6 flex flex-wrap justify-end gap-4">
                    <SecondaryButton
                        onClick={() =>
                            setData(
                                "permissions",
                                selectedRole?.permission_ids ?? [],
                            )
                        }
                        disabled={!isDirty || processing}
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        disabled={
                            !selectedRole?.is_editable ||
                            !canAssignPermissions ||
                            !isDirty ||
                            processing
                        }
                    >
                        {processing ? "Saving..." : "Save permissions"}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
