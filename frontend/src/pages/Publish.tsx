import { NavBar } from "@/components/nav-bar"
import { WriteEditor } from "@/components/write-editor"

export const Publish = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />
            <WriteEditor />
        </div>
    )
}