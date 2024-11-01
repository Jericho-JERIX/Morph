import { BaseInteraction } from "discord.js";
import { acceptUserBindingGroupRequest, rejectUserBindingGroupRequest } from "../service/UserBindingGroupRequest.service";
import { ManageUserBindingGroupMemberMessage } from "../templates/messages/ManageUserBindingGroupMemberMessage";

export async function responseUserBindingRequest(interaction: BaseInteraction) {

    if (!interaction.isButton()) return
    
    const [method, idStr] = interaction.customId.split("/")
    const id = parseInt(idStr)
    
    switch (method) {
        case "accept-user-binding":
            const acceptedRequest = await acceptUserBindingGroupRequest(id)

            if (!acceptedRequest.user) return

            const userBindingGroupMessage = await ManageUserBindingGroupMemberMessage({ userId: acceptedRequest.user.userId })
            const acceptRequester = await interaction.client.users.fetch(acceptedRequest.user.userId)

            await acceptRequester.send({
                ...userBindingGroupMessage,
                content: `Your request to bind with <@${acceptedRequest.targetUser?.userId}> has been accepted!`
            })

            await interaction.update({
                ...userBindingGroupMessage,
                content: `Your request to bind with <@${acceptedRequest.user?.userId}> has been accepted!`,
                components: [],
            })
            break
        
        case "reject-user-binding":
            const rejectedRequest = await rejectUserBindingGroupRequest(id)
            if (!rejectedRequest) return

            const rejectRequester = await interaction.client.users.fetch(rejectedRequest.userId)
            rejectRequester.send({
                content: `Your request to bind with <@${rejectedRequest.targetUserId}> has been rejected!`
            })

            await interaction.update({
                content: `Your request to bind with <@${rejectedRequest.userId}> has been rejected!`,
                components: [],
                embeds: []
            })
            break
    }

}