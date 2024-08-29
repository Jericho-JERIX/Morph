import { prisma } from "../database/prisma";

export async function getMemberRoles(guildId: string, userId: string) {
    return prisma.memberRole.findUnique({
        where: { guildId_userId: { guildId, userId } }
    })
}

export async function createMemberRoles(guildId: string, userId: string, roleIds: string[]) {
    return prisma.memberRole.create({
        data: {
            guildId,
            userId,
            roleIds: roleIds.join(",")
        }
    })
}

export async function updateMemberRoles(guildId: string, userId: string, roleIds: string[]) {
    return prisma.memberRole.update({
        where: { guildId_userId: { guildId, userId } },
        data: {
            roleIds: roleIds.join(",")
        }
    })
}

export async function createOrUpdateMemberRoles(guildId: string, userId: string, roleIds: string[]) {
    return prisma.memberRole.upsert({
        where: { guildId_userId: { guildId, userId } },
        update: {
            roleIds: roleIds.join(",")
        },
        create: {
            guildId,
            userId,
            roleIds: roleIds.join(",")
        }
    })
}