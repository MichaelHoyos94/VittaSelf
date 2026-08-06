export default function NavigationCard({ icon: Icon, title, text }) {
    return (
        <div className="bg-white border-2 rounded-lg shadow-lg p-4 transform transition-transform hover:scale-110 cursor-pointer">
            <div className="flex sm:flex-col items-center">
                {Icon && typeof Icon === "string" ? (
                    <div className="rounded-full bg-primary-100 p-3">
                        <i className={`h-6 w-6 text-primary-800 ${Icon}`} />
                    </div>
                ) : (
                    <div className="rounded-full bg-primary-100 p-3">
                        <Icon
                            className="h-16 w-16 text-primary-800"
                            aria-hidden="true"
                        />
                    </div>
                )}
                <div>
                    <h3>{title}</h3>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
}
