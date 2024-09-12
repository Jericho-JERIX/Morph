import { prisma } from "../database/prisma";
import { CreateMemberRole } from "../types/MemberRole.type";

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

export async function bulkCreateMemberRoles(payload: CreateMemberRole[]) {

    // Get existing member roles where guildId and userId are the same
    const existing = await prisma.memberRole.findMany({
        where: {
            AND: [
                { guildId: { in: payload.map(({ guildId }) => guildId) } },
                { userId: { in: payload.map(({ userId }) => userId) } }
            ]
        }
    })

    const existingMap = new Map(existing.map((item) => [`${item.guildId}_${item.userId}`, item]))

    payload = payload.filter(({ guildId, userId }) => !existingMap.has(`${guildId}_${userId}`))

    if (!payload.length) return []

    return prisma.memberRole.createManyAndReturn({
        data: payload.map(({ guildId, userId, roleIds }) => ({
            guildId,
            userId,
            roleIds: roleIds.join(",")
        }))
    })
}

export async function bulkCreateOrUpdateMemberRoles(payload: CreateMemberRole[]) {
    const queues = []
    
    for (const { guildId, userId, roleIds } of payload) {
        queues.push(
            prisma.memberRole.upsert({
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
        )
    }
    
    return Promise.all(queues)
}

export async function deleteGuildMemberRoles(guildId: string) {
    return prisma.memberRole.deleteMany({
        where: { guildId }
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