import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { resolutions } = usePage().props;
    console.log(resolutions);
    return <>
        <h1>INDEX RESOLUTIONS</h1>
    </>;
}

Index.layout = (page) => <MainLayout children={page} />