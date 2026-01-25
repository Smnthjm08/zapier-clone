"use client"

import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SignupForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <Card className="max-w-sm w-full">
            <CardHeader className="text-center">

                <CardTitle>Sign Up</CardTitle>
                <CardDescription> Sign up to create your account </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Email" />
                        </div>                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="Username" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" />
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="text-center flex-col gap-2">
                <div className="text-sm font-thin">Already have an account? <Link href="/signin" className="text-orange-300 hover:underline">Sign In</Link></div>
                <Button variant={"outline"} className="w-full">Sign Up with GitHub</Button>
                <Button variant={"outline"} className="w-full">Sign Up with Google</Button>
            </CardFooter>
        </Card>
    )
}