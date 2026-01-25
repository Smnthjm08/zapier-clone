"use client";

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
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

export default function SigninForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <Card className="max-w-sm w-full">
            <CardHeader className="text-center">
                <CardTitle>Sign In</CardTitle>
                <CardDescription> Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
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
                <Button variant={"outline"} className="w-full">
                    <Image src="/github.svg" alt="github-icon" width={20} height={20} />
                    Sign In with GitHub
                </Button>
                <Button variant={"outline"} className="w-full">
                    <Image src="/google.svg" alt="google-icon" width={20} height={20} />
                    Sign In with Google
                </Button>
            </CardFooter>
        </Card>
    );
}
