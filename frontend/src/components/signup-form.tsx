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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link, useNavigate } from "react-router"
import { useCallback, useState, type ChangeEvent } from "react"
import axios from "axios";
import { BACKEND_URL } from "@/config"
import { AlertCircle } from "lucide-react"

export function SignupForm({
  
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errorMessage) setErrorMessage(null)
  }, [errorMessage])

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (errorMessage) setErrorMessage(null)
  }, [errorMessage])

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errorMessage) setErrorMessage(null)
  }, [errorMessage])

  async function SendReq(){
    try{
      setErrorMessage(null)
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        email,
        name,
        password,
      });
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/blogs")
    }catch(e){
      if (axios.isAxiosError(e)) {
        const status = e.response?.status
        const serverMessage =
          typeof e.response?.data?.error === "string" ? e.response.data.error : null

        if (status === 409) {
          setErrorMessage(serverMessage ?? "A user with this email already exists.")
        } else if (status === 422) {
          setErrorMessage("Invalid Credentials")
        } else {
          setErrorMessage(serverMessage ?? "Unable to sign up. Try again.")
        }
      } else {
        setErrorMessage("Unable to sign up. Try again.")
      }
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
            <h1 className="text-3xl font-bold">Welcome to BlogIt</h1>
            <FieldDescription>
              Already have an account? <Link to = {"/login"}>Log in</Link>
            </FieldDescription>
          </div>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <div>
                <AlertTitle>Sign up failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </div>
            </Alert>
          )}
          <Field>
            <FieldLabel className="text-sm" htmlFor="email">Email <span className="text-destructive">*</span> </FieldLabel>
            <Input
              value={email}
              onChange={handleEmailChange}
              id="email"
              type="email"
              placeholder="me@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm" htmlFor="name">Name</FieldLabel>
            <Input
              value={name}
              onChange={handleNameChange}
              id="name"
              type="name"
              placeholder="John Doe"
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm" htmlFor="password">Password <span className="text-destructive">*</span> </FieldLabel>
            <Input
              value={password}
              onChange={handlePasswordChange}
              id="password"
              type="password"
              required
            />
          </Field>

          <Field>
            <Button onClick={SendReq} className="text-sm" type="button" disabled={loading}>
              {loading ? (
                <Spinner>Creating account...</Spinner>
              ) : (
                "Create Account"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

    </div>
  )
}
