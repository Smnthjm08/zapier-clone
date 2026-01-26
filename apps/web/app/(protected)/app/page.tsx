"use client"

import { CreateZapDialog } from "@/components/create-zap-dialog";
import ZapsList from "@/components/zaps-list";
import { axiosInstance } from "@/lib/axios";

export default function AppPage() {
  // const zaps = await axiosInstance.get("/zaps");
  // console.log(zaps);
  return (
    <main className="w-full flex flex-col p-6 gap-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold">My Zaps</h1>
        <CreateZapDialog />
      </div>
      <ZapsList />
    </main>
  );
}
