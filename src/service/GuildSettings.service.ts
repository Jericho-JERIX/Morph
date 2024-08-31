import { prisma } from "../database/prisma";

export async function getGuildSettings(guildId: string) {
    return prisma.guildSettings.findUnique({
        where: { guildId }
    })
}