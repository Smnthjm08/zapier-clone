"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import { getZapByIdAction } from "@/actions/zap";
import { SortableStep } from "./sortable-step";
import { StepConnector } from "./step-connector";
import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { getZapByIdAction } from "@/actions/get-zap-actions";

interface ZapStep {
  id: string;
  type: "trigger" | "action";
  name: string;
  image?: string;
  sortingOrder?: number;
}

export function ZapEditor({ zapId }: { zapId: string }) {
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<ZapStep[]>([]);
  const [trigger, setTrigger] = useState<ZapStep | null>(null);

  useEffect(() => {
    async function fetchZap() {
      const res = await getZapByIdAction(zapId);
      if (res.data) {
        const zap = res.data;
        if (zap.trigger) {
          setTrigger({
            id: zap.trigger.id,
            type: "trigger",
            name: zap.trigger.type?.name || "Trigger",
            image: zap.trigger.type?.image,
          });
        }
        const actionSteps: ZapStep[] = (zap.actions || []).map(
          (action: any) => ({
            id: action.id,
            type: "action",
            name: action.type?.name || "Action",
            image: action.type?.image,
            sortingOrder: action.sortingOrder,
          }),
        );
        setSteps(actionSteps);
      }
      setLoading(false);
    }
    fetchZap();
  }, [zapId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);

        // TODO: Sync new sortingOrder to database
        console.log(
          "New order:",
          newArray.map((s, i) => ({ id: s.id, order: i })),
        );

        return newArray;
      });
    }
  }

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted bg-size-[80px_80px] py-12 px-12">
      <div className="max-w-2xl mx-auto space-y-2">
        {trigger && (
          <div className="flex flex-col items-center">
            <SortableStep
              id={trigger.id}
              type="trigger"
              name={trigger.name}
              index={0}
              image={trigger.image}
            />
            <StepConnector />
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={steps.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <SortableStep
                  id={step.id}
                  type="action"
                  name={step.name}
                  index={index + 1}
                  image={step.image}
                />
                {index < steps.length - 1 && <StepConnector />}
              </div>
            ))}
          </SortableContext>
        </DndContext>

        <div className="flex flex-col items-center pt-2">
          <StepConnector />
          <Button
            variant="outline"
            className="rounded-full h-10 px-6 border-dashed hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-sm bg-background"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
      </div>
    </div>
  );
}
