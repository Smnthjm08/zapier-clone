"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon, Loader2 } from "lucide-react";
import { createZapAction } from "@/actions/zap";

export function CreateZapDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      const response = await createZapAction({
        name: name,
        description: description,
      });

      if (response.error) {
        console.error("Failed to create zap:", response.error);
        return;
      }

      console.log("response", response);

      setName("");
      setDescription("");
      setOpen(false);

      router.push(`/app/zaps/${response?.data?.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <PlusCircleIcon className="mr-2 h-4 w-4" />
        Create Zap
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new Zap</DialogTitle>
            <DialogDescription>
              Give your automation a name. You can configure triggers and
              actions next.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="zap-name">Name</Label>
              <Input
                id="zap-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Send Slack message on new signup"
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="zap-description">Description (optional)</Label>
              <Input
                id="zap-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={loading} />
              }
            >
              Cancel
            </DialogClose>

            <Button type="submit" disabled={loading || !name.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Zap
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
