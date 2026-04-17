import { useState } from "react";
import NavLink from "./NavLink";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };
    return (
        <aside className="w-64 h-screen bg-[var(--surface-container-low)] border-r border-[var(--outline-variant)] p-4">
            <img src="/images/logo/logo2.png" alt="LOGO" />
            <h2 className="text-lg font-bold mb-4">Mi App</h2>

            <nav className="flex flex-col gap-2">
                {/* 🏠 Simple link */}
                <NavLink
                    href="/dashboard"
                    active={route().current("dashboard")}
                >
                    Dashboard
                </NavLink>

                <div>
                    <button
                        onClick={() => toggleMenu("sanctions")}
                        className="w-full text-left p-2 rounded hover:bg-[var(--surface-variant)]"
                    >
                        Sanctions
                    </button>

                    {openMenu === "sanctions" && (
                        <div className="ml-4 flex flex-col">
                            <NavLink
                                href="/sanctions/disciplinary-cases"
                                active={route().current("products")}
                            >
                                Disciplinary Cases
                            </NavLink>
                            <NavLink
                                href="/dashboard"
                                active={route().current("products")}
                            >
                                Products
                            </NavLink>
                            <NavLink
                                href="/dashboard"
                                active={route().current("products")}
                            >
                                Products
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* 📦 Parent menu */}
                <div>
                    <button
                        onClick={() => toggleMenu("inventario")}
                        className="w-full text-left p-2 rounded hover:bg-[var(--surface-variant)]"
                    >
                        Inventario
                    </button>

                    {openMenu === "inventario" && (
                        <div className="ml-4 flex flex-col">
                            <NavLink
                                href="/dashboard"
                                active={route().current("products")}
                            >
                                Products
                            </NavLink>
                            <NavLink
                                href="/dashboard"
                                active={route().current("products")}
                            >
                                Products
                            </NavLink>
                            <NavLink
                                href="/dashboard"
                                active={route().current("products")}
                            >
                                Products
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* 👥 Humane Resources */}
                <div>
                    <button
                        onClick={() => toggleMenu("human-resources")}
                        className="w-full text-left p-2 rounded hover:bg-[var(--surface-variant)]"
                    >
                        Human Resources
                    </button>

                    {openMenu === "human-resources" && (
                        <div className="ml-4 flex flex-col">
                            <NavLink
                                href="/human-resources/employees"
                                active={route().current(
                                    "human-resources.employees",
                                )}
                            >
                                Employees
                            </NavLink>
                            <NavLink
                                href="/human-resources/roles"
                                active={route().current(
                                    "human-resources.roles",
                                )}
                            >
                                Roles
                            </NavLink>
                            <NavLink
                                href="/human-resources/permissions"
                                active={route().current(
                                    "human-resources.permissions",
                                )}
                            >
                                Permissions
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
}
