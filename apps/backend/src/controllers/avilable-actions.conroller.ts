import { prisma } from "@repo/db";
import { Request, Response } from "express";

export const getAvailableActionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const availableActions = await prisma.availableAction.findMany();
    return res.status(200).json({ data: availableActions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAvilableActionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, description, appName, appLogo, configSchema } = req.body;
    const availableAction = await prisma.availableAction.create({
      data: {
        name,
        description,
        appName,
        appLogo,
        configSchema,
      },
    });
    return res.status(201).json({ data: availableAction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAvilableActionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id, name, description, appName, appLogo, configSchema } = req.body;

    const existingAvailableAction = await prisma.availableAction.findUnique({
      where: { id },
    });

    if (!existingAvailableAction) {
      return res.status(404).json({ error: "Available Action not found" });
    }

    const availableAction = await prisma.availableAction.update({
      where: { id },
      data: {
        name,
        description,
        appName,
        appLogo,
        configSchema,
      },
    });
    return res.status(200).json({ data: availableAction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAvilableActionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.body;

    const existingAvailableAction = await prisma.availableAction.findUnique({
      where: { id },
    });

    if (!existingAvailableAction) {
      return res.status(404).json({ error: "Available Action not found" });
    }

    const availableAction = await prisma.availableAction.delete({
      where: { id },
    });
    return res.status(200).json({ data: availableAction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
