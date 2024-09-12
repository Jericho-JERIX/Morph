import { EmbedBuilder, User } from "discord.js";

export function UserBindingRequestEmbed({
    user
}:{
    user: User
}) {
    return new EmbedBuilder()
        .setAuthor({ name: "User Binding Request" || user.defaultAvatarURL })
        .setDescription(`You have received a binding request from <@${user.id}>.`)
}