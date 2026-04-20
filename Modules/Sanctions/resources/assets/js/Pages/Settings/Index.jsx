import NavigationCard from "@/Components/NavigationCard"
import MainLayout from "@/Layouts/MainLayout"
import { ScaleIcon } from "@heroicons/react/16/solid"

export default function Index() {

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h3>Settings</h3>
            <p>Custom your catalogues in your sanctions process.</p>
            <div className="flex flex-wrap flex-shrink-0 items-center justify-evenly gap-4 mt-4">

                <a href="/sanctions/disciplinary-cases">
                    <NavigationCard
                        icon={<ScaleIcon className="w-32 h-32 text-primary-400" />}
                        title={"Policies"}
                        text={"Manage policies"}
                    />
                </a>
                <a href="">
                    <NavigationCard
                        icon={<ScaleIcon className="w-32 h-32 text-primary-200" />}
                        title={"Mitigations"}
                        text={"Manage mitigations"}
                    />
                </a>
                <a href="">
                    <NavigationCard
                        icon={<ScaleIcon className="w-32 h-32 text-primary-200" />}
                        title={"Sources"}
                        text={"Manage sources"}
                    />
                </a>
            </div>
        </div>
    )
}

Index.layout = page => <MainLayout children={page} />