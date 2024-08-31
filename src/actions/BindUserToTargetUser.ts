import { createUserBindingChild, createUserBindingParent, getUserBindingParent } from "../service/UserBinding.service"

export async function bindUserToTargetUser(userId: string, targetUserId: string) {
    
    let parentUser = await getUserBindingParent(targetUserId)
    
    if (!parentUser) {
        parentUser = await createUserBindingParent(targetUserId)
    }

    await createUserBindingChild(userId, parentUser.userId)
}