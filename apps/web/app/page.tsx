"use client"

import { Button } from "@/components/ui/button";
import { app } from "@/constants/base";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex flex-col items-center min-h-screen justify-center">
      <div className="text-5xl font-bold text-primary">{app.title}</div>
      <div className="text-xl text-primary-foreground">{app.description}</div>
      <div className="flex gap-2 pt-8">
        <Button variant={"outline"}><Link href="/signup">Sign Up</Link></Button>
        <Button variant={"default"}><Link href="/signin">Sign In</Link></Button>
      </div>
    </main>
  );
}
