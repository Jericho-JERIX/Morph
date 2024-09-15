import { UserBindingGroup } from "@prisma/client";
import { prisma } from "../database/prisma";
import { CreateUserBindingAccount } from "../types/UserBindingGroup.type";

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

export async function createUserBindingParent(user: CreateUserBindingAccount) {
    const { userId, username } = user
    return prisma.userBindingGroup.create({
        data: {
            userId,
            username,
            parentUserId: userId,
            isParent: true
        }
    })
}

export async function createUserBindingChild(parentUserId: string, user: CreateUserBindingAccount) {
    const { userId, username } = user
    return prisma.userBindingGroup.create({
        data: {
            userId,
            username,
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

export async function bindUserToTargetUser(user: CreateUserBindingAccount, targetUser: CreateUserBindingAccount) {

    const { userId, username } = user
    const { userId: targetUserId } = targetUser

    let userBindingGroup = await prisma.userBindingGroup.findUnique({ where: { userId } })
    let targetUserBindingGroup = await prisma.userBindingGroup.findUnique({ where: { userId: targetUserId } })

    // If both users have never been in database before: User is parent and target user is child
    if (!userBindingGroup && !targetUserBindingGroup) {
        await createUserBindingParent(user)
        await createUserBindingChild(userId, targetUser)
    }

    // If user already has a tree, then the target user will be new child of that tree
    else if (userBindingGroup && !targetUserBindingGroup) {
        await createUserBindingChild(userBindingGroup.parentUserId, targetUser)
    }

    // If target user already has a tree, then the user will be new child of that tree
    else if (!userBindingGroup && targetUserBindingGroup) {
        await createUserBindingChild(targetUserBindingGroup.parentUserId, user)
    }

    // If both users have a tree, then the target user tree will be merged into the one tree of the user's parent
    else if (userBindingGroup && targetUserBindingGroup) {

        if (userBindingGroup.parentUserId === targetUserBindingGroup.parentUserId) return { user: userBindingGroup, targetUser: targetUserBindingGroup }

        await prisma.userBindingGroup.updateMany({
            where: { parentUserId: targetUserBindingGroup.parentUserId },
            data: { parentUserId: userBindingGroup.parentUserId, isParent: false }
        })
    }

    userBindingGroup = await prisma.userBindingGroup.findUnique({ where: { userId } })
    targetUserBindingGroup = await prisma.userBindingGroup.findUnique({ where: { userId: targetUserId } })

    return { user: userBindingGroup, targetUser: targetUserBindingGroup }

}