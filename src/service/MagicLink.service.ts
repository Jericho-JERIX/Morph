import { prisma } from "../database/prisma";

export async function createMagicLink(payload: {
    guildId: string;
    userId: string;
    code: string;
    invitationLink: string;
    roleId: string;
}) {
    return prisma.magicLink.create({
        data: {
            guildId: payload.guildId,
            userId: payload.userId,
            code: payload.code,
            invitationLink: payload.invitationLink,
            roleId: payload.roleId
        }
    })
}

export async function getMagicLinkByCode(code: string) {
    return prisma.magicLink.findFirst({
        where: {
            code
        }
    })
}

export async function getMagicLinkListByCodeList(codeList: string[]) {
    return prisma.magicLink.findMany({
        where: {
            code: {
                in: codeList
            }
        }
    })
}