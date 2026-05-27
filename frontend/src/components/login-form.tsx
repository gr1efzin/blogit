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
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { AlertCircle } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDeployed = typeof window !== "undefined" && window.location.hostname !== "localhost"

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
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
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
        email,
        password,
      });
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/blogs")
    }catch(e){
      if (axios.isAxiosError(e)) {
        if (
          isDeployed &&
          (BACKEND_URL.includes("127.0.0.1") || BACKEND_URL.includes("localhost") || BACKEND_URL === "")
        ) {
          setErrorMessage(
            "Backend URL is not set for production. Set VITE_BACKEND_URL in Vercel to your deployed backend (HTTPS), then redeploy."
          )
          setLoading(false)
          return
        }

        const status = e.response?.status
        const serverMessage =
          typeof e.response?.data?.error === "string" ? e.response.data.error : null

        if (status === 403) {
          setErrorMessage(serverMessage ?? "User not found. Check your email and password.")
        } else if (status === 422) {
          setErrorMessage("Invalid Credentials")
        } else if (!e.response) {
          setErrorMessage(
            "Could not reach the server. This is usually a wrong backend URL or a CORS issue."
          )
        } else {
          setErrorMessage(serverMessage ?? "Unable to log in. Try again.")
        }
      } else {
        setErrorMessage("Unable to log in. Try again.")
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
              Don&apos;t have an account? <Link to = {"/signup"}>Sign up</Link>
            </FieldDescription>
          </div>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <div>
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </div>
            </Alert>
          )}
          <Field>
            <FieldLabel htmlFor="email">Email <span className="text-destructive">*</span> </FieldLabel>
            <Input
            value={email}
            onChange={handleEmailChange}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password <span className="text-destructive">*</span> </FieldLabel>
            <Input
              value={password}
              onChange={handlePasswordChange}
              id="password"
              type="password"
              required
            />
          </Field>
          <Field>
            <Button onClick={SendReq} className="w-full" type="button" disabled={loading}>
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
