import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowRightOnRectangleIcon,
    BellIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    GlobeAltIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Header() {
    const [openProfile, setOpenProfile] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;
    const cartCount = auth?.cart_count;
    const displayName = user?.full_name || user?.name || "Michael";
    const email = user?.email || "admin@vittaself.com";
    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
            <div className="flex w-full max-w-md items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 transition duration-200 focus-within:border-primary-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
                <MagnifyingGlassIcon className="mr-2 h-5 w-5 shrink-0 text-slate-500" />
                <input
                    type="search"
                    placeholder="Buscar..."
                    className="w-full border-0 bg-transparent p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-0"
                />
            </div>

            <div className="ml-6 flex items-center gap-3">
                {cartCount !== null && cartCount !== undefined && (
                    <Link
                        href="/carts/my-cart"
                        className="relative rounded-full p-2.5 text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-primary-700 active:scale-95"
                        aria-label={`Carrito: ${cartCount} productos`}
                    >
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-700 px-1 text-[10px] font-bold leading-none text-white">
                            {cartCount > 99 ? "99+" : cartCount}
                        </span>
                    </Link>
                )}

                <button
                    type="button"
                    className="relative rounded-full p-2.5 text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-primary-700 active:scale-95"
                    aria-label="Notifications"
                >
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                        3
                    </span>
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-primary-700 active:scale-95"
                >
                    <GlobeAltIcon className="h-5 w-5" />
                    <span>ES</span>
                </button>

                <div className="relative ml-1 border-l border-slate-200 pl-4">
                    <button
                        type="button"
                        onClick={() => setOpenProfile(!openProfile)}
                        className="flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left transition duration-200 hover:bg-slate-100 active:scale-[0.98]"
                        aria-expanded={openProfile}
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-sm font-bold text-primary-800">
                            {initials || "VS"}
                        </span>
                        <span className="hidden min-w-0 flex-col lg:flex">
                            <span className="max-w-36 truncate text-sm font-semibold text-slate-800">
                                {displayName}
                            </span>
                            <span className="max-w-36 truncate text-xs text-slate-500">
                                Administrador
                            </span>
                        </span>
                        <ChevronDownIcon
                            className={cn(
                                "hidden h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 sm:block",
                                openProfile && "rotate-180",
                            )}
                        />
                    </button>

                    {openProfile && (
                        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                            <div className="border-b border-slate-200 px-4 py-3">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                    {displayName}
                                </p>
                                <p className="truncate text-xs text-slate-500">
                                    {email}
                                </p>
                            </div>
                            <div className="py-2">
                                <Link
                                    href={
                                        typeof route === "function"
                                            ? route("profile.edit")
                                            : "/profile"
                                    }
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-50 hover:text-primary-700"
                                >
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span>Editar perfil</span>
                                </Link>
                                <Link
                                    href="/sanctions/settings"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-50 hover:text-primary-700"
                                >
                                    <Cog6ToothIcon className="h-5 w-5" />
                                    <span>Configuracion</span>
                                </Link>
                            </div>
                            <div className="border-t border-slate-200 py-2">
                                <Link
                                    href={
                                        typeof route === "function"
                                            ? route("logout")
                                            : "/logout"
                                    }
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition duration-200 hover:bg-red-50"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span>Cerrar sesion</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
