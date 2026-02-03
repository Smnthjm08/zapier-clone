"use client";

import React from "react";

export function StepConnector() {
  return (
    <div className="flex justify-center my-2">
      <div className="w-[2px] h-8 bg-muted-foreground/30 relative">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
}
