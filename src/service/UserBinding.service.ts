import { prisma } from "../database/prisma";

export async function getUserBindingParent(userId: string) {
    const user = await prisma.userBindingGroup.findUnique({
        where: { userId }
    })
    if (!user) return null
    if (user.isParent) return user

    const parentUser = await prisma.userBindingGroup.findUnique({
        where: { userId: user.parentUserId }
    })
    return parentUser

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

        const newParent = await prisma.userBindingGroup.findFirst({
            where: { parentUserId: user.userId, isParent: false }
        })

        if (!newParent) return prisma.userBindingGroup.delete({ where: { userId } })

        await prisma.userBindingGroup.update({
            where: { userId: newParent.userId },
            data: { isParent: true, parentUserId: newParent.userId }
        })

        await prisma.userBindingGroup.updateMany({
            where: { parentUserId: user.userId },
            data: { parentUserId: newParent.userId }
        })

    }
    
    return prisma.userBindingGroup.delete({ where: { userId } })

}

export async function getUserBindingData(userId: string) {
    
    return prisma.userBindingGroup.findUnique({
        where: { userId }
    })
}

export async function getUsersBindingGroup(userId: string) {
    
    const parent = await getUserBindingParent(userId)
    
    if (!parent) return []
    
    return prisma.userBindingGroup.findMany({
        where: { parentUserId: parent.userId }
    })
}

export async function bindUserToTargetUser(userId: string, targetUserId: string) {

    let user = await prisma.userBindingGroup.findUnique({ where: { userId } })
    let targetUser = await prisma.userBindingGroup.findUnique({ where: { userId: targetUserId } })

    // If both users have never been in database before: User is parent and target user is child
    if (!user && !targetUser) {
        await createUserBindingParent(userId)
        await createUserBindingChild(targetUserId, userId)
    }

    // If user already has a tree, then the target user will be new child of that tree
    else if (user && !targetUser) {
        await createUserBindingChild(targetUserId, user.parentUserId)
    }

    // If target user already has a tree, then the user will be new child of that tree
    else if (!user && targetUser) {
        await createUserBindingChild(userId, targetUser.parentUserId)
    }

    // If both users have a tree, then the target user tree will be merged into the one tree of the user's parent
    else if (user && targetUser) {

        if (user.parentUserId === targetUser.parentUserId) return { user, targetUser }

        await prisma.userBindingGroup.updateMany({
            where: { parentUserId: targetUser.parentUserId },
            data: { parentUserId: user.parentUserId, isParent: false }
        })
    }

    user = await prisma.userBindingGroup.findUnique({ where: { userId } })
    targetUser = await prisma.userBindingGroup.findUnique({ where: { userId: targetUserId } })

    return { user, targetUser }

}