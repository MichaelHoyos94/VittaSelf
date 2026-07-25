import { usePage } from '@inertiajs/react';

export default function useAuthorization() {
    const { auth } = usePage().props;

    const user = auth?.user ?? null;

    const roles = Array.isArray(auth?.roles)
        ? auth.roles
        : [];

    const permissions = Array.isArray(auth?.permissions)
        ? auth.permissions
        : [];

    const hasRole = (role) => {
        if (!role) {
            return false;
        }

        return roles.includes(role);
    };

    const hasAnyRole = (requiredRoles = []) => {
        const normalizedRoles = Array.isArray(requiredRoles)
            ? requiredRoles
            : [requiredRoles];

        return normalizedRoles.some((role) => roles.includes(role));
    };

    const hasAllRoles = (requiredRoles = []) => {
        const normalizedRoles = Array.isArray(requiredRoles)
            ? requiredRoles
            : [requiredRoles];

        return normalizedRoles.every((role) => roles.includes(role));
    };

    const can = (permission) => {
        if (!permission) {
            return false;
        }

        return hasRole('super-admin') || permissions.includes(permission);
    };

    const canAny = (requiredPermissions = []) => {
        const normalizedPermissions = Array.isArray(requiredPermissions)
            ? requiredPermissions
            : [requiredPermissions];

        return hasRole('super-admin') || normalizedPermissions.some((permission) =>
            permissions.includes(permission)
        );
    };

    const canAll = (requiredPermissions = []) => {
        const normalizedPermissions = Array.isArray(requiredPermissions)
            ? requiredPermissions
            : [requiredPermissions];

        return hasRole('super-admin') || normalizedPermissions.every((permission) =>
            permissions.includes(permission)
        );
    };

    return {
        user,
        roles,
        permissions,
        hasRole,
        hasAnyRole,
        hasAllRoles,
        can,
        canAny,
        canAll,
    };
}
