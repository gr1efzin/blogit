import { LoginForm } from "@/components/login-form"

export const Login = () =>{
    return(
        <div className="min-h-screen w-full flex items-center justify-center px-6">
            <LoginForm className="w-full max-w-[25rem] animate-in fade-in slide-in-from-bottom-4 duration-700" />
        </div>
    )
}