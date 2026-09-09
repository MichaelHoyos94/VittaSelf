import NavigationCard from "@/Components/NavigationCard"
import MainLayout from "@/Layouts/MainLayout"
import { DocumentTextIcon, ScaleIcon } from "@heroicons/react/16/solid"
import { Head } from "@inertiajs/react"

export default function Index() {

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2">
            <Head title="Settings" />
            <div>
                <h3 className="text-2xl font-bold">Settings</h3>
                <p className="text-sm text-gray-500">Custom your catalogues in your sanctions process.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 flex-shrink-0 items-center justify-evenly gap-4 mt-4">

                <a href="/sanctions/settings/policies">
                    <NavigationCard
                        icon={DocumentTextIcon}
                        title={"Policies"}
                        text={"Manage policies"}
                    />
                </a>
                <a href="">
                    <NavigationCard
                        icon={ScaleIcon}
                        title={"Mitigations"}
                        text={"Manage mitigations"}
                    />
                </a>
                <a href="">
                    <NavigationCard
                        icon={ScaleIcon}
                        title={"Sources"}
                        text={"Manage sources"}
                    />
                </a>
            </div>
        </div>
    )
}

Index.layout = page => <MainLayout children={page} />