import { prisma } from "../database/prisma";

export async function getUserBindingParent(userId: string) {
    const user = await prisma.userBindingGroup.findUnique({
        where: { userId }
    })
    if (!user) return null
    if (user.isParent) return user
    const aaa = await prisma.userBindingGroup.findUnique({
        where: { userId: user.parentUserId }
    })
    return aaa

}

export async function createUserBindingParent(userId: string) {
    return prisma.userBindingGroup.create({
        data: {
            userId,
            parentUserId: userId,
            isParent: true
        }
    })
}

export async function createUserBindingChild(userId: string, parentUserId: string) {
    return prisma.userBindingGroup.create({
        data: {
            userId,
            parentUserId
        }
    })
}

export async function removeUserFromUserBindingGroup(userId: string) {
    
    const user = await prisma.userBindingGroup.findUnique({ where: { userId } })

    if (!user) return null
    
    if (user.isParent) {

        const newParent = await prisma.userBindingGroup.findFirstOrThrow({
            where: { parentUserId: user.userId, isParent: false }
        })

        await prisma.userBindingGroup.updateMany({
            where: { parentUserId: user.userId },
            data: { parentUserId: newParent.userId }
        })
    }
    
    return prisma.userBindingGroup.delete({ where: { userId } })

}

export async function getUsersBindingGroup(userId: string) {
    
    const parent = await getUserBindingParent(userId)
    
    if (!parent) return []
    
    return prisma.userBindingGroup.findMany({
        where: { parentUserId: parent.userId }
    })
}

export async function bindUserToTargetUser(userId: string, targetUserId: string) {
    
    let parentUser = await getUserBindingParent(targetUserId)
    
    if (!parentUser) {
        parentUser = await createUserBindingParent(targetUserId)
    }

    return createUserBindingChild(userId, parentUser.userId)
}