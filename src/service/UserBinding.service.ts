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

export async function removeUserBindingUser(userId: string) {
    
    const user = await prisma.userBindingGroup.findUnique({ where: { userId } })

    if (!user) return null
    
    if (user.isParent) {
        const child = await prisma.userBindingGroup.findFirst({
            where: { parentUserId: userId }
        })
        if (!child) {
            return prisma.userBindingGroup.delete({ where: { userId } })
        }
        return prisma.userBindingGroup.update({
            where: { userId: child.userId },
            data: {
                isParent: true
            }
        })
    }

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