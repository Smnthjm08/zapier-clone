import { prisma } from "@repo/db";
import { Request, Response } from "express";

export const getAvailableTriggersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const availableTriggers = await prisma.availableTrigger.findMany();
    return res.status(200).json(availableTriggers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAvilableTriggersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, description, appName, appLogo, configSchema } = req.body;
    const availableTrigger = await prisma.availableTrigger.create({
      data: {
        name,
        description,
        appName,
        appLogo,
        configSchema,
      },
    });
    return res.status(201).json(availableTrigger);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAvilableTriggersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { zapId } = req.params;
    const existingAvailableTrigger = await prisma.availableTrigger.findUnique({
      where: { id: zapId },
    });

    if (!existingAvailableTrigger) {
      return res.status(404).json({ error: "Available Trigger not found" });
    }

    const { id, name, description, appName, appLogo, configSchema } = req.body;
    const availableTrigger = await prisma.availableTrigger.update({
      where: { id },
      data: {
        name,
        description,
        appName,
        appLogo,
        configSchema,
      },
    });
    return res.status(200).json(availableTrigger);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAvilableTriggersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { zapId } = req.params;
    const existingAvailableTrigger = await prisma.availableTrigger.findUnique({
      where: { id: zapId },
    });

    if (!existingAvailableTrigger) {
      return res.status(404).json({ error: "Available Trigger not found" });
    }

    const { id } = req.body;
    const availableTrigger = await prisma.availableTrigger.delete({
      where: { id },
    });
    return res.status(200).json(availableTrigger);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
