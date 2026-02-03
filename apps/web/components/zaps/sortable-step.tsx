"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SortableStepProps {
  id: string;
  name: string;
  index: number;
  type: "trigger" | "action";
  image?: string;
}

export function SortableStep({
  id,
  name,
  index,
  type,
  image,
}: SortableStepProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group px-4">
      <Sheet>
        <Card className="w-full max-w-lg mx-auto transition-all hover:ring-2 hover:ring-primary/20 hover:border-primary/50 cursor-default overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-0 p-0">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="px-3 py-6 cursor-grab active:cursor-grabbing hover:bg-muted/50 transition-colors border-r"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground/50" />
            </div>

            {/* Clickable Content Trigger */}
            <SheetTrigger className="flex-1 flex flex-row items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/50 p-2.5 shadow-sm border">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold text-muted-foreground">
                    {type === "trigger" ? "T" : "A"}
                  </span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                  Step {index + 1} • {type === "trigger" ? "Trigger" : "Action"}
                </span>
                <CardTitle className="text-base font-semibold truncate">
                  {name}
                </CardTitle>
              </div>
            </SheetTrigger>
          </CardHeader>
        </Card>

        {/* Configuration Panel */}
        <SheetPopup side="right" className="sm:max-w-xl">
          <SheetHeader className="border-b bg-muted/30">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background p-2 border shadow-sm">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="font-bold">
                    {type === "trigger" ? "T" : "A"}
                  </span>
                )}
              </div>
              <div>
                <SheetTitle>{name}</SheetTitle>
                <SheetDescription>
                  Configure your {type} settings manually or using AI.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <SheetPanel className="space-y-6">
            <div className="rounded-xl border border-dashed p-8 flex flex-col items-center justify-center text-center space-y-3 bg-muted/20">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-lg">✨</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">No configuration yet</h4>
                <p className="text-xs text-muted-foreground">
                  Set up this {type} to start automating your workflow.
                </p>
              </div>
              <Button size="sm">Set up {type}</Button>
            </div>
          </SheetPanel>

          <SheetFooter className="border-t">
            <SheetClose render={<Button variant="outline" />}>
              Discard changes
            </SheetClose>
            <Button>Save settings</Button>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
