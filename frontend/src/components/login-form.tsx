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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password <span className="text-destructive">*</span> </FieldLabel>
            <Input
              id="password"
              type="password"
              required
            />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
        

        </FieldGroup>
      </form>

    </div>
  )
}
