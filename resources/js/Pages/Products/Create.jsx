import Form from "@/Components/Form/Form";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";

export default function Create()
{
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2>New Product</h2>
            <p>Create new product form.</p>
            <Form>
                <div className="grid grid-cols-2">

                </div>
                <div className="flex flex-wrap gap-4 justify-end">
                    <PrimaryButton>send</PrimaryButton>
                    <SecondaryButton>cancel</SecondaryButton>
                </div>
            </Form>
        </div>
    )
}

Create.layout = (page) => <MainLayout children={page} />