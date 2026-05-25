"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { useState, type ChangeEvent } from "react"
import type { SignupInput } from "@/validation"

export function SignupForm({
  
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [postInputs, setpostInputs] = useState<SignupInput>({
      email: "",
      name: "",
      password:""
  })
  // const [name, setName] = useState("")
  // const [password, setPassword] = useState("")
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
            <h1 className="text-3xl font-bold">Welcome to Blogit</h1>
            <FieldDescription>
              Already have an account? <Link to = {"/login"}>Log in</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel className="text-sm" htmlFor="email">Email <span className="text-destructive">*</span> </FieldLabel>
            <Input
              value={postInputs.email} onChange={(e:ChangeEvent<HTMLInputElement>) => setpostInputs(c => ({
                ...c,
                email: e.target.value
              }))}
              id="email"
              type="email"
              placeholder="me@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm" htmlFor="name">Name</FieldLabel>
            <Input
              value={postInputs.name} onChange={(e:ChangeEvent<HTMLInputElement>) => setpostInputs(c => ({
                ...c,
                name: e.target.value
              }))}
              id="name"
              type="name"
              placeholder="John Doe"
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm" htmlFor="password">Password <span className="text-destructive">*</span> </FieldLabel>
            <Input
              value={postInputs.password} onChange={(e:ChangeEvent<HTMLInputElement>) => setpostInputs(c => ({
                ...c,
                password: e.target.value
              }))}
              id="password"
              type="passowrd"
              required
            />
          </Field>

          <Field>
            <Button className="text-xs" type="submit">Create Account</Button>
          </Field>
        </FieldGroup>
      </form>

    </div>
  )
}
