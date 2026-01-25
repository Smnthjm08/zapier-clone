import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen justify-center">
      <div className="font-black">Font Black</div>
      <div className="font-extrabold">Font Extrabold</div>
      <div className="font-bold">Font Bold</div>
      <div className="font-semibold">Font Semibold</div>
      <div className="font-medium">Font Medium</div>
      <div className="font-normal">Font Normal</div>
      <div className="font-light">Font Light</div>
      <div className="font-extralight">Font Extralight</div>
      <div className="font-thin">Font Thin</div>
      <Button variant={"outline"}><Link href="/signup">Sign Up</Link></Button>
      <Button variant={"default"}><Link href="/signin">Sign In</Link></Button>

    </main>
  );
}
