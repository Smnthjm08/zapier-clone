import { Request, Response } from "express";
import { zapService } from "../services/zap.service.js";

export const getAllZaps = async (req: Request, res: Response) => {
  try {
    const { pageSize, page } = req.query;
    const zaps = await zapService.getAllZaps(
      req.user.id,
      Number(pageSize),
      Number(page),
    );
    return res.status(200).json(zaps);
  } catch (error) {
    console.log("error fetching zaps", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getZapById = async (req: Request, res: Response) => {
  try {
    const { zapId } = req.params;
    const zap = await zapService.getZapById(req.user.id, zapId as string);
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error fetching zap", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createZap = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const { name, description } = req.body;
    const zap = await zapService.createZap(req.user.id, { name, description });
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error creating zap", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateZap = async (req: Request, res: Response) => {
  try {
    const { zapId } = req.params;
    const { zapData } = req.body;
    const zap = await zapService.updateZap(
      req.user.id,
      zapId as string,
      zapData,
    );
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error updating zap", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteZap = async (req: Request, res: Response) => {
  try {
    const { zapId } = req.params;
    const zap = await zapService.deleteZap(req.user.id, zapId as string);
    return res.status(200).json(zap);
  } catch (error) {
    console.log("error deleting zap", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
