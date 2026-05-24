import { SignupForm } from "@/components/signup-form"


export const Signup = () =>{
    return(
        <div className="min-h-screen w-full flex items-center justify-center px-6">
        <SignupForm className="w-full max-w-sm"></SignupForm>
        </div>
    )
}