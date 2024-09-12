import { BaseInteraction } from "discord.js";
import { acceptUserBindingGroupRequest, rejectUserBindingGroupRequest } from "../service/UserBindingGroupRequest.service";

export async function responseUserBindingRequest(interaction: BaseInteraction) {

    if (!interaction.isButton()) return
    
    const [method, idStr] = interaction.customId.split("/")
    const id = parseInt(idStr)
    
    switch (method) {
        case "accept-user-binding":
            await acceptUserBindingGroupRequest(id)
            await interaction.update({
                content: "Accept!",
                components: [],
                embeds: []
            })
            return
        
        case "reject-user-binding":
            await rejectUserBindingGroupRequest(id)
            await interaction.update({
                content: "Reject!",
                components: [],
                embeds: []
            })
            return
    }

    

}