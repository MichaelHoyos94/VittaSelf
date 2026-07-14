
export default function Footer()
{
    return (
        <div className="flex flex-col sm:flex-row px-4 content-between justify-normal sm:justify-between items-center bg-white">
            <div>
                <p>
                    © 2026 VittaSelf, developed by <span className="font-semibold">Michael Aguirre</span>
                </p>
            </div>
            {/* Social media links */}
            <div>
                <a href="https://www.linkedin.com/in/michael-aguirre-2b0b3b1a6/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.065-1.868-3.065-1.868 0-2.154 1.459-2.154 2.967v5.702h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.562 2.838-1.562 3.036 0 3.6 2 3.6 4.599v5.596z" />
                    </svg>
                </a>
            </div>
        </div>       
    )
}