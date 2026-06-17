import PrimaryButton from "@/Components/PrimaryButton";
import MainLayout from "@/Layouts/MainLayout";


export default function Index()
{
    return (
        <div className="rounded bg-white p-4">
            <div>
                <h2>Product counts</h2>
                <p>Daily product counts by cost center</p>
            </div>
            <div>
                <PrimaryButton>
                    Create
                </PrimaryButton>
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />