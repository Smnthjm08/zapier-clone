"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteZapAction } from "@/actions/zap";

interface DeleteZapDialogProps {
  zapId: string;
  onSuccess: (id: string) => void;
}

export function DeleteZapDialog({ zapId, onSuccess }: DeleteZapDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteZapAction(zapId);
      if (res.status === 200) {
        onSuccess(zapId);
      } else {
        console.error("Failed to delete zap:", res.error);
      }
    } catch (error) {
      console.error("Error deleting zap:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant={"destructive"} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Zap
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose
            render={<Button variant="outline">Cancel</Button>}
          />
          <AlertDialogClose
            render={
              <Button
                variant="destructive"
                className="bg-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Zap"}
              </Button>
            }
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
