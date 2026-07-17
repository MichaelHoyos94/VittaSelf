import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowRightOnRectangleIcon,
    ChevronDownIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon,
    ScaleIcon,
    ShoppingBagIcon,
    Squares2X2Icon,
    UsersIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/16/solid";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Sidebar() {
    const isCurrent = (name) =>
        typeof route === "function" ? route().current(name) : false;

    const navigation = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: Squares2X2Icon,
            active: isCurrent("dashboard"),
        },
        {
            id: "sanctions",
            label: "Sanctions",
            icon: ScaleIcon,
            active:
                isCurrent("sanctions.*") ||
                isCurrent("sanctions.disciplinary-cases.index") ||
                isCurrent("sanctions.resolutions.index") ||
                isCurrent("sanctions.settings"),
            items: [
                {
                    label: "Disciplinary Cases",
                    href: "/sanctions/disciplinary-cases",
                    active: isCurrent("sanctions.disciplinary-cases.index"),
                },
                {
                    label: "Resolutions History",
                    href: "/sanctions/resolutions",
                    active: isCurrent("sanctions.resolutions.index"),
                },
                {
                    label: "Settings",
                    href: "/sanctions/settings",
                    active: isCurrent("sanctions.settings"),
                },
            ],
        },
        {
            id: "audits",
            label: "Audits",
            icon: ClipboardDocumentCheckIcon,
            active:
                isCurrent("audits.*") ||
                isCurrent("audits.quality-checklists.index") ||
                isCurrent("audits.product-counts.index") ||
                isCurrent("audits.history.index"),
            items: [
                {
                    label: "Quality Checklists",
                    href: "/audits/quality-checklists",
                    active: isCurrent("audits.quality-checklists.index"),
                },
                {
                    label: "Product Counts",
                    href: "/audits/product-counts",
                    active: isCurrent("audits.product-counts.index"),
                },
                {
                    label: "Audit History",
                    href: "/audits/history",
                    active: isCurrent("audits.history.index"),
                },
            ],
        },
        {
            id: "operations",
            label: "Operations",
            icon: WrenchScrewdriverIcon,
            active: isCurrent("products"),
            items: [
                {
                    label: "Inventory Entry",
                    href: "/dashboard",
                    active: false,
                },
                {
                    label: "Inventory Transfer",
                    href: "/dashboard",
                    active: false,
                },
                {
                    label: "Products",
                    href: "/dashboard",
                    active: isCurrent("products"),
                },
            ],
        },
        {
            id: "human-resources",
            label: "Human Resources",
            icon: UsersIcon,
            active:
                isCurrent("human-resources.*") ||
                isCurrent("human-resources.employees") ||
                isCurrent("human-resources.roles") ||
                isCurrent("human-resources.permissions"),
            items: [
                {
                    label: "Employees",
                    href: "/human-resources/employees",
                    active: isCurrent("human-resources.employees"),
                },
                {
                    label: "Roles",
                    href: "/human-resources/roles",
                    active: isCurrent("human-resources.roles"),
                },
                {
                    label: "Permissions",
                    href: "/human-resources/permissions",
                    active: isCurrent("human-resources.permissions"),
                },
            ],
        },
        {
            id: "orders",
            label: "Orders",
            icon: ShoppingBagIcon,
            active:
                isCurrent("orders.*") ||
                isCurrent("orders.internal-orders.index") ||
                isCurrent("orders.web-orders.index"),
            items: [
                {
                    label: "Internal Orders",
                    href: "/orders/internal-orders",
                    active: isCurrent("orders.internal-orders.index"),
                },
                {
                    label: "Web Orders",
                    href: "/orders/web-orders",
                    active: isCurrent("orders.web-orders.index"),
                },
            ],
        },
        {
            id: "cash-register-manage",
            label: "Cash Register Manage",
            icon: ArchiveBoxIcon,
            active:
                isCurrent("cash-register-manage.*") ||
                isCurrent("cash-register-manage.cash-registers.index") ||
                isCurrent("cash-register-manage.cash-register-closings.index"),
            items: [
                {
                    label: "Cash Registers",
                    href: "/cash-registers-manage",
                    active: isCurrent("cash-register-manage.cash-registers.index"),
                },
                {
                    label: "Cash Register Closings",
                    href: "/cash-register-manage/cash-register-closings",
                    active: isCurrent("cash-register-manage.cash-register-closings.index"),
                },
            ],
        },
        {
            label: "My Cash Register",
            href: "/my-cash-register",
            icon: ArchiveBoxIcon,
            active: isCurrent("cash-registers.my-cash-register"),
        },
    ];

    const activeMenu = navigation.find((item) => item.items && item.active)?.id;
    const [openMenu, setOpenMenu] = useState(activeMenu ?? null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const renderNavItem = (item) => {
        const Icon = item.icon;

        if (!item.items) {
            return (
                <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                        "group flex items-center gap-3 border-l-4 px-5 py-3 text-sm font-semibold transition duration-200 active:scale-[0.98]",
                        item.active
                            ? "border-primary-700 bg-primary-100/80 text-primary-800"
                            : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-primary-700",
                    )}
                >
                    <Icon
                        className={cn(
                            "h-5 w-5 shrink-0",
                            item.active
                                ? "text-primary-700"
                                : "text-slate-500 group-hover:text-primary-700",
                        )}
                    />
                    <span>{item.label}</span>
                </Link>
            );
        }

        const expanded = openMenu === item.id;

        return (
            <div key={item.id}>
                <button
                    type="button"
                    onClick={() => toggleMenu(item.id)}
                    className={cn(
                        "group flex w-full items-center gap-3 border-l-4 px-5 py-3 text-left text-sm font-semibold transition duration-200 active:scale-[0.98]",
                        item.active
                            ? "border-primary-700 bg-primary-100/80 text-primary-800"
                            : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-primary-700",
                    )}
                    aria-expanded={expanded}
                >
                    <Icon
                        className={cn(
                            "h-5 w-5 shrink-0",
                            item.active
                                ? "text-primary-700"
                                : "text-slate-500 group-hover:text-primary-700",
                        )}
                    />
                    <span className="min-w-0 flex-1">{item.label}</span>
                    <ChevronDownIcon
                        className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            expanded && "rotate-180",
                        )}
                    />
                </button>

                {expanded && (
                    <div className="mb-2 ml-12 mt-1 flex flex-col gap-1 border-l border-slate-200 pl-4">
                        {item.items.map((subItem) => (
                            <Link
                                key={subItem.label}
                                href={subItem.href}
                                className={cn(
                                    "w-fit border-b-2 py-1 text-sm transition duration-200",
                                    subItem.active
                                        ? "border-primary-700 font-semibold text-primary-700"
                                        : "border-transparent text-slate-500 hover:border-primary-200 hover:text-primary-700",
                                )}
                            >
                                {subItem.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className="flex h-dvh w-[260px] shrink-0 flex-col border-r border-slate-200 bg-white py-6 shadow-sm">
            <div className="mb-6 px-6">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <img
                        src="/images/logo/logo2.png"
                        alt="VittaSelf"
                        className="h-12 w-12 shrink-0 rounded-xl object-contain"
                    />
                    <span className="min-w-0">
                        <span className="block text-2xl font-bold leading-7 text-primary-800">
                            VittaSelf
                        </span>
                        <span className="block text-xs font-medium text-slate-500">
                            Enterprise Admin
                        </span>
                    </span>
                </Link>
            </div>

            <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
                {navigation.map(renderNavItem)}
            </nav>

            <div className="mt-4 border-t border-slate-200 pt-4">
                <Link
                    href="/sanctions/settings"
                    className="group flex items-center gap-3 border-l-4 border-transparent px-5 py-3 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-primary-700"
                >
                    <Cog6ToothIcon className="h-5 w-5 text-slate-500 group-hover:text-primary-700" />
                    <span>Settings</span>
                </Link>
                <Link
                    href={typeof route === "function" ? route("logout") : "/logout"}
                    method="post"
                    as="button"
                    className="group flex w-full items-center gap-3 border-l-4 border-transparent px-5 py-3 text-left text-sm font-semibold text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-red-600"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-slate-500 group-hover:text-red-600" />
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
}
