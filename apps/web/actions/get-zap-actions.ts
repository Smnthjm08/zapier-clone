"use server";

import { auth } from "@repo/auth/server";
import { prisma } from "@repo/db";
import { headers } from "next/headers";

export const getZapByIdAction = async (zapId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const data = await prisma.zap.findUnique({
      where: {
        id: zapId,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
          orderBy: {
            sortingOrder: "asc",
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    return { data: data, status: 200 };
  } catch (error) {
    console.error("Error fetching zap by id via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
};
