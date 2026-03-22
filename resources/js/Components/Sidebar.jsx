import { useState } from 'react';
import NavLink from './NavLink';

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };
    return (
        <aside className="w-64 h-screen bg-[var(--surface-container-low)] border-r border-[var(--outline-variant)] p-4">

            <h2 className="text-lg font-bold mb-4">Mi App</h2>

            <nav className="flex flex-col gap-2">

                {/* 🏠 Simple link */}
                <NavLink href="/dashboard" active={route().current('dashboard')}>
                    Dashboard
                </NavLink>

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
                            <NavLink href="/dashboard" active={route().current('products')}>
                                Products
                            </NavLink>
                            <NavLink href="/dashboard" active={route().current('products')}>
                                Products
                            </NavLink>
                            <NavLink href="/dashboard" active={route().current('products')}>
                                Products
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* 👥 Otro menú */}
                <div>
                    <button
                        onClick={() => toggleMenu("usuarios")}
                        className="w-full text-left p-2 rounded hover:bg-[var(--surface-variant)]"
                    >
                        Usuarios
                    </button>

                    {openMenu === "usuarios" && (
                        <div className="ml-4 flex flex-col">
                            <a href="#" className="p-2 text-sm hover:bg-[var(--surface-variant)] rounded">
                                Lista
                            </a>
                            <a href="#" className="p-2 text-sm hover:bg-[var(--surface-variant)] rounded">
                                Roles
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
}