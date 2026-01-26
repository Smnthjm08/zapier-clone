import { prisma } from "@repo/db";

interface ZapData {
  name: string;
  description?: string;
}
export class ZapService {
  async getAllZaps(userId: string, pageSize: number = 10, page: number = 1) {
    const zaps = await prisma.zap.findMany({
      where: {
        userId: userId
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    return zaps;
  }

  async getZapById(userId: string, zapId: string) {
    const zap = await prisma.zap.findUnique({
      where: {
        id: zapId,
        userId,
      },
    });
    return zap;
  }

  async createZap(userId: string, zapData: ZapData) {
    const newZap = await prisma.zap.create({
      data: {
        name: zapData.name,
        description: zapData.description,
        userId: userId,
      },
    });
    return newZap;
  }

  async updateZap(userId: string, zapId: string, zapData: any) {
    const updatedZap = await prisma.zap.updateMany({
      where: {
        id: zapId,
        userId,
      },
      data: {
        ...zapData,
      },
    });
    return updatedZap;
  }

  async deleteZap(userId: string, zapId: string) {
    const deletedZap = await prisma.zap.deleteMany({
      where: {
        id: zapId,
        userId,
      },
    });
    return deletedZap;
  }
}

export const zapService = new ZapService();
