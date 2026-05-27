import { SignupForm } from "@/components/signup-form"
import { Navigate } from "react-router"

export const Signup = () => {
    const token = localStorage.getItem("token")
    if (token) {
        return <Navigate to="/blogs" replace />
    }
    return (
        <div className="min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 lg:slide-in-from-left-4 lg:[--tw-enter-translate-y:0]">
                <SignupForm className="w-full max-w-sm" />
            </div>
            <div className="hidden lg:flex items-center justify-center bg-foreground/10 px-6 lg:px-12 animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="w-full max-w-2xl">
                    <p className="text-2xl font-semibold leading-snug font-mono">
                        "Blogit has completely transformed how I write and share my ideas. 
                        The clean interface lets me focus on what matters most — my words."
                    </p>
                    <div className="mt-6">
                        <p className="font-semibold">Cim Took</p>
                        <p className="text-sm text-muted-foreground">CEO | Pineapple</p>
                    </div>
                </div>
            </div>
        </div>
    )
}