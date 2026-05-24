import { LoginForm } from "@/components/login-form"

export const Login = () =>{
    return(
        <div className="min-h-screen w-full flex items-center justify-center px-6">
        <LoginForm className="w-full max-w-sm"></LoginForm>
        </div>
    )
}