import { prisma } from "../database/prisma";
import { bindUserToTargetUser } from "./UserBinding.service";

export async function createUserBindingGroupRequest(userId: string, targetUserId: string) {
    return prisma.userBindingGroupRequest.create({
        data: {
            userId,
            targetUserId,
        },
    });
}

export async function getUserBindingGroupRequests(userId: string, filter?: Record<string, any>) {
    console.log('where', {
        userId,
        ...filter,
    })
    return prisma.userBindingGroupRequest.findMany({
        where: {
            userId,
            ...filter,
        },
    });
}

export async function acceptUserBindingGroupRequest(id: number) {
    
    const userBindingGroupRequest = await prisma.userBindingGroupRequest.update({
        where: {
            id,
        },
        data: {
            status: "accepted",
        },
    });
    
    return bindUserToTargetUser(userBindingGroupRequest.userId, userBindingGroupRequest.targetUserId);
}

export async function rejectUserBindingGroupRequest(id: number) {
    return prisma.userBindingGroupRequest.update({
        where: {
            id,
        },
        data: {
            status: "rejected",
        },
    });
}

export async function cancelUserBindingGroupRequest(id: number) {
    return prisma.userBindingGroupRequest.update({
        where: {
            id,
        },
        data: {
            status: "canceled",
        },
    });
}