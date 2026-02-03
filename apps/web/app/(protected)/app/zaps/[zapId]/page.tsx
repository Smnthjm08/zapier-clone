"use client";

import { useParams } from "next/navigation";
import { ZapEditor } from "@/components/zaps/zap-editor";

export default function ZapDetailsPage() {
  const { zapId } = useParams();

  if (!zapId || typeof zapId !== "string") {
    return <div>Invalid Zap ID</div>;
  }

  return (
    <main className="p-4">
      <ZapEditor zapId={zapId} />
    </main>
  );
}
