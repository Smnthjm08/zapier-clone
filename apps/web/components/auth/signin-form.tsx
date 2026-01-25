"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toastManager } from "../ui/toast";
import { signIn } from "@repo/auth/client";
import { SocialAuth } from "./social-auth";

export default function SigninForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signIn.email(
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    onRequest: () => {
                        setIsLoading(true);
                    },
                    onSuccess: () => {
                        toastManager.add({
                            title: "Success",
                            description: "Signed in successfully.",
                        });
                        router.push("/app");
                    },
                    onError: (ctx) => {
                        toastManager.add({
                            title: "Error",
                            description: ctx.error.message || "Failed to sign in. Please check your credentials.",
                        });
                    },
                }
            );
        } catch (error) {
            console.error(error);
            toastManager.add({
                title: "Error",
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Card className="max-w-sm w-full">
            <CardHeader className="text-center">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="text-center flex-col gap-2">
                <div className="text-sm font-thin">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-orange-300 hover:underline">
                        Sign Up
                    </Link>
                </div>
                <SocialAuth mode="signin" />
            </CardFooter>
        </Card>
    );
}
