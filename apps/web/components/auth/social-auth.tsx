"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { GithubIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { toastManager } from "../ui/toast";
import { signIn } from "@repo/auth/client";

interface SocialAuthProps {
  mode: "signin" | "signup";
}

export function SocialAuth({ mode }: SocialAuthProps) {
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);

  const handleSocialAuth = async (provider: "github" | "google") => {
    setIsSocialLoading(provider);

    try {
      await signIn.social(
        {
          provider,
          callbackURL: "/app",
        },
        {
          onError: (ctx) => {
            toastManager.add({
              title: "Error",
              description:
                ctx.error.message ||
                `Failed to ${mode === "signin" ? "sign in" : "sign up"} with ${provider}`,
            });
            setIsSocialLoading(null);
          },
        },
      );
    } catch (error) {
      console.error(error);
      toastManager.add({
        title: "Error",
        description: `Something went wrong with social ${mode === "signin" ? "sign in" : "sign up"}`,
      });
      setIsSocialLoading(null);
    }
  };

  const actionText = mode === "signin" ? "Sign In" : "Sign Up";

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialAuth("github")}
        disabled={isSocialLoading !== null}
      >
        {isSocialLoading === "github" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GithubIcon className="mr-2 h-4 w-4" />
        )}
        {actionText} with GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialAuth("google")}
        disabled={isSocialLoading !== null}
      >
        {isSocialLoading === "google" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="google-icon"
            width={20}
            height={20}
            className="mr-2"
          />
        )}
        {actionText} with Google
      </Button>
    </>
  );
}
