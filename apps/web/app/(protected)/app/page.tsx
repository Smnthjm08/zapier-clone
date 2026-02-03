"use client";
import { CreateZapDialog } from "@/components/dialogs/create-zap-dialog";
import ZapsList from "@/components/cards/zaps-list";

export default function AppPage() {
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
