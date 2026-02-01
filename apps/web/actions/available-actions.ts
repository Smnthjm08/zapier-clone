"use server";

import { auth } from "@repo/auth/server";
import { prisma } from "@repo/db";
import { headers } from "next/headers";

export const getAvailableActionsAction = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const availableActions = await prisma.availableAction.findMany();

    return { data: availableActions, status: 200 };
  } catch (error) {
    console.error("Error fetching available actions via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
};
