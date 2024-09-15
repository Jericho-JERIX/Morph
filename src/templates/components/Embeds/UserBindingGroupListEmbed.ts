import { UserBindingGroup, UserBindingGroupRequest } from "@prisma/client";
import { EmbedBuilder, GuildMember } from "discord.js";

export function UserBindingGroupListEmbed({
    userBindingGroupList,
    userBindingGroupPendingRequestList
}: {
    userBindingGroupList: UserBindingGroup[];
    userBindingGroupPendingRequestList: UserBindingGroupRequest[];
}) {

    const userList = userBindingGroupList.map((userBindingGroup) => `<@${userBindingGroup.userId}>`);
    const userPendingList = userBindingGroupPendingRequestList.map((userBindingGroup) => `<@${userBindingGroup.targetUserId}>`);

    const statusList = userBindingGroupList.map(() => "Active");
    const statusPendingList = userBindingGroupPendingRequestList.map(() => "Pending");

    const userIdList = userBindingGroupList.map((userBindingGroup) => `\`${userBindingGroup.userId}\``);
    const userPendingIdList = userBindingGroupPendingRequestList.map((userBindingGroup) => `\`${userBindingGroup.targetUserId}\``);

    return new EmbedBuilder()
        .setTitle("User Binding Group")
        .addFields({
            name: "User",
            value: [...userList, ...userPendingList].join("\n"),
            inline: true
        }, {
            name: "Status",
            value: [...statusList, ...statusPendingList].join("\n"),
            inline: true
        }, {
            name: "User ID",
            value: [...userIdList, ...userPendingIdList].join("\n"),
            inline: true
        })
}