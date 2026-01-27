import { Request, Response } from "express";
import { prisma } from "@repo/db";

export const getAllZaps = async (req: Request, res: Response) => {
  try {
    const zaps = await prisma.zap.findMany({
      where: {
        userId: req.user.id,
      },
    });
    return res.status(200).json(zaps);
  } catch (error) {
    console.log("error fetching zaps", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const getZapById = async (req: Request, res: Response) => {
  try {
    const { zapId } = req.params;
    const zap = await prisma.zap.findUnique({
      where: {
        id: zapId,
        userId: req.user.id,
      },
    });
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error fetching zap", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const createZap = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const zap = await prisma.zap.create({
      data: {
        name,
        description,
        userId: req.user.id,
      },
    });
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error creating zap", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const updateZap = async (req: Request, res: Response) => {
  try {
    const { zapId } = req.params;
    const { zapData } = req.body;
    const zap = await prisma.zap.update({
      where: {
        id: zapId,
        userId: req.user.id,
      },
      data: zapData,
    });
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error updating zap", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const deleteZap = async (req: Request, res: Response) => {
  try {
    const { zapId } = req.params;
    const zap = await prisma.zap.delete({
      where: {
        id: zapId,
        userId: req.user.id,
      },
    });
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error deleting zap", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
