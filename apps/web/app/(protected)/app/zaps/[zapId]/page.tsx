"use client";

import { useParams } from "next/navigation";

export default function ZapDetailsPage() {
  const { zapId } = useParams();
  console.log("zap", zapId);

  return (
    <main>
      <div>{zapId}</div>
    </main>
  );
}
