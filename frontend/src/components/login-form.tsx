"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "./ui/spinner"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useState, type ChangeEvent } from "react"
import type { LoginInput } from "@/validation"
import axios from "axios"
import { BACKEND_URL } from "@/config"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<LoginInput>({
      email: "",
      password:""
  })
  const [loading, setLoading] = useState(false);

    async function SendReq(){
    try{
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`,postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/blogs")
    }catch(e){
      console.log(e)
      setLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
            </a>
            <h1 className="text-xl font-bold">Welcome to Blogit</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link to = {"/signup"}>Sign up</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email <span className="text-destructive">*</span> </FieldLabel>
            <Input
            value={postInputs.email} onChange={(e:ChangeEvent<HTMLInputElement>) => setpostInputs(c => ({
              ...c,
              email: e.target.value     
              }))}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password <span className="text-destructive">*</span> </FieldLabel>
            <Input
              value={postInputs.password} onChange={(e:ChangeEvent<HTMLInputElement>) => setpostInputs(c => ({
              ...c,
              password: e.target.value     
              }))}
              id="password"
              type="password"
              required
            />
          </Field>
          <Field>
            <Button onClick={SendReq} type="button" disabled={loading}>
              {loading ? (
                <Spinner>Logging in...</Spinner>
              ) : (
                "Login"
              )}
            </Button>
          </Field>
        

        </FieldGroup>
      </form>

    </div>
  )
}
