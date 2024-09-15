import { EmbedBuilder, User } from "discord.js";
import { PrimaryColor } from "../../../constants/Color.constant";

export function UserBindingRequestEmbed({
    user
}:{
    user: User
}) {
    return new EmbedBuilder()
        .setColor(PrimaryColor)
        .setAuthor({ name: "User Binding Request" || user.defaultAvatarURL })
        .setDescription(`You have received a binding request from <@${user.id}>.`)
}