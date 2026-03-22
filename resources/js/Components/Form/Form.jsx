
export default function Form({ children, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4 border rounded-md">
            {children}
        </form>
    );
}