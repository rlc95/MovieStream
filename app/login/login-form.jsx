"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth-client";
// import { loginUser } from "@/lib/apis/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Client component for CSR
export default function LoginForm({ title }) {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Error, setError] = useState("");

  const validateForm = () => {
    setError("");

    if (!email) {
      setEmailError("Email is required!");
      return false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required!");
      return false;
    } else {
      setPasswordError("");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // Login Form Data Submission
      // const login = await loginUser({ email: email, password: password });

      // console.log("LOGIN RESPONSE", login);
      setLoading(true);
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            redirect("/dashboard");
          },
          onError: (ctx) => {
            console.log('ERR ',ctx.error.message);
            setError(ctx.error.message);
          },
        }
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-[380px] mx-auto">
      <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50/90 w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
          <CardDescription className="text-xs text-center">
            Welcome to Movie Paradise
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />

                {emailError && (
                 <div className="text-red-600 text-xs mt-2 ml-1">{emailError}</div>
                )}

              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                {passwordError && (
                  <div className="text-red-600 text-xs mt-2 ml-1">
                    {passwordError}
                  </div>
                )}
              </div>

              {/* form errors */}
              <div className="flex justify-center">
                {Error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-1000">
                    {Error}
                  </span>
                )}
              </div>


              <div className="flex justify-center gap-1 text-xs">
                Not registered?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                Create an account
                </Link>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button className="flex-1" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Sign in 
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
  );
}
