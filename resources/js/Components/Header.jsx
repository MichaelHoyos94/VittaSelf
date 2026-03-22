import { useState } from 'react';

export default function Header() {
    const [openProfile, setOpenProfile] = useState(false);
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-[var(--surface)] border-b border-[var(--outline-variant)]">

            {/* 🔍 Search */}
            <div className="flex items-center bg-[var(--surface-container)] px-3 py-1 rounded-md w-1/3">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {/* ⚙️ Actions */}
            <div className="flex items-center gap-4">

                {/* 🔔 Notifications */}
                <button className="relative">
                    🔔
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                        3
                    </span>
                </button>

                {/* 🌐 Language */}
                <button>🌐 ES</button>

                {/* 👤 Profile */}
                <div className="relative">
                    <button onClick={() => setOpenProfile(!openProfile)}>
                        👤
                    </button>

                    {openProfile && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border">
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Editar perfil
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Configuración
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}