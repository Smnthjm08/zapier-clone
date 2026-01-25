"use client";

import { authClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toastManager } from "./ui/toast";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-700">
      Navbar
      <Button
        variant={"destructive"}
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toastManager.add({
                  title: "Signed out",
                  description: "Signed out successfully.",
                  // variant: "default",
                });
                router.push("/signin");
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </nav>
  );
}
