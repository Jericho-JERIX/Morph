import { prisma } from "../database/prisma";

export async function getGuildSettings(guildId: string) {
    return prisma.guildSettings.findUnique({
        where: { guildId }
    })
}

export async function createGuildSettings(guildId: string) {
    return prisma.guildSettings.create({
        data: {
            guildId
        }
    })
}

export async function allowCollectServerData(guildId: string) {
    return prisma.guildSettings.update({
        where: { guildId },
        data: {
            allowedCollectData: true,
            lastDataCollectedDate: new Date()
        }
    })
}

export async function disallowCollectServerData(guildId: string) {
    return prisma.guildSettings.update({
        where: { guildId },
        data: {
            allowedCollectData: false
        }
    })
}

export async function updateRolesRecovery(guildId: string, enabled: boolean) {
    return prisma.guildSettings.update({
        where: { guildId },
        data: {
            enabledRolesRecovery: enabled
        }
    })
}

export async function updateUserBindingGroup(guildId: string, enabled: boolean) {
    return prisma.guildSettings.update({
        where: { guildId },
        data: {
            enabledUserBindingGroup: enabled
        }
    })
}