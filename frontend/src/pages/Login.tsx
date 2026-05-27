import { LoginForm } from "@/components/login-form"
import { Navigate } from "react-router"

export const Login = () =>{
    const token = localStorage.getItem("token")
    if (token) {
        return <Navigate to="/blogs" replace />
    }
    return(
        <div className="min-h-screen w-full flex items-center justify-center px-6">
            <LoginForm className="w-full max-w-[25rem] animate-in fade-in slide-in-from-bottom-4 duration-700" />
        </div>
    )
}