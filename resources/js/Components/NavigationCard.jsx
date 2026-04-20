export default function NavigationCard({
    icon,
    title,
    text
}) {
    return (
        <div className="bg-white border-2 rounded-lg shadow-md p-4 transform transition-transform hover:scale-110 cursor-pointer">
            <div className="icon">
                {icon}
            </div>
            <div>
                <h3>{title}</h3>
                <span>{text}</span>
            </div>
        </div>
    )
}