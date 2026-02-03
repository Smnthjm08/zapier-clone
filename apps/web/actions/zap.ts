"use server";

import { auth } from "@repo/auth/server";
import { prisma } from "@repo/db";
import { headers } from "next/headers";

export async function getZapsAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const zaps = await prisma.zap.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return { data: zaps, status: 200 };
  } catch (error) {
    console.error("Error fetching zaps via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function createZapAction(data: {
  name: string;
  description?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const newZap = await prisma.zap.create({
      data: {
        name: data.name,
        description: data.description,
        userId: session.user.id,
      },
    });

    return { data: newZap, status: 200 };
  } catch (error) {
    console.error("Error creating zap via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function updateZapAction(
  zapId: string,
  data: { name: string; description?: string },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const updatedZap = await prisma.zap.update({
      where: {
        id: zapId,
        userId: session.user.id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return { data: updatedZap, status: 200 };
  } catch (error) {
    console.error("Error updating zap via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function deleteZapAction(zapId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const deletedZap = await prisma.zap.delete({
      where: {
        id: zapId,
        userId: session.user.id,
      },
    });

    return { data: deletedZap, status: 200 };
  } catch (error) {
    console.error("Error deleting zap via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function getZapByIdAction(zapId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const zap = await prisma.zap.findUnique({
      where: {
        id: zapId,
        userId: session.user.id,
      },
      include: {
        trigger: {
          include: {
            type: true,
          },
        },
        actions: {
          include: {
            type: true,
          },
          orderBy: {
            sortingOrder: "asc",
          },
        },
      },
    });

    if (!zap) {
      return { error: "Zap not found", status: 404 };
    }

    return { data: zap, status: 200 };
  } catch (error) {
    console.error("Error fetching zap by id via server action:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
