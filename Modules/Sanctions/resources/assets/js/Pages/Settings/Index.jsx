import NavigationCard from "@/Components/NavigationCard"
import MainLayout from "@/Layouts/MainLayout"
import { DocumentTextIcon, ScaleIcon } from "@heroicons/react/16/solid"

export default function Index() {

    return (
        <div className="p-8 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl">
            <h3>Settings</h3>
            <p>Custom your catalogues in your sanctions process.</p>
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