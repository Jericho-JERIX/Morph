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

    const user = await prisma.userBindingGroup.findUnique({ where: { userId } })
    const targetUser = await prisma.userBindingGroup.findUnique({ where: { userId } })

    // If both users have never been in database before: User is parent and target user is child
    if (!user && !targetUser) {
        await createUserBindingParent(userId)
        return createUserBindingChild(targetUserId, userId)
    }

    // If user already has a tree, then the target user will be new child of that tree
    else if (user && !targetUser) {
        return createUserBindingChild(targetUserId, user.parentUserId)
    }

    // If target user already has a tree, then the user will be new child of that tree
    else if (!user && targetUser) {
        return createUserBindingChild(userId, targetUser.parentUserId)
    }

    // If both users have a tree, then the target user tree will be merged into the one tree of the user's parent
    else if (user && targetUser) {
        await prisma.userBindingGroup.updateMany({
            where: { parentUserId: targetUser.parentUserId },
            data: { parentUserId: user.parentUserId }
        })
    }

    // if (targetUser === null) {
    //     let parentUser = await getUserBindingParent(targetUserId)
    
    //     if (!parentUser) {
    //         parentUser = await createUserBindingParent(targetUserId)
    //     }

    //     return createUserBindingChild(userId, parentUser.userId)
    // }
    // else {
    //     await prisma.userBindingGroup.updateMany({
    //         where: { parentUserId: targetUser.parentUserId },
    //         data: {

    //         }
    //     })
    // }
    
    
}