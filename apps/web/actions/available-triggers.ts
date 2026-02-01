"use server";

import { auth } from "@repo/auth/server";
import { prisma } from "@repo/db";
import { headers } from "next/headers";

export const getAvailableTriggersAction = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const availableTriggers = await prisma.availableTrigger.findMany();

    return { data: availableTriggers, status: 200 };
  } catch (error) {
    console.error(
      "Error fetching available triggers via server action:",
      error,
    );
    return { error: "Internal Server Error", status: 500 };
  }
};
