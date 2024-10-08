import { EmbedBuilder, User } from "discord.js";
import { PrimaryColor } from "../../../constants/Color.constant";

export function UserBindingRequestEmbed({
    user
}:{
    user: User
}) {
    return new EmbedBuilder()
        .setColor(PrimaryColor)
        .setThumbnail(user.displayAvatarURL())
        .setAuthor({ name: "User Binding Request" })
        .setDescription(`You have received a binding request from <@${user.id}>.`)
}