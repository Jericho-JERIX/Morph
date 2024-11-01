import { UserBindingGroup, UserBindingGroupRequest } from "@prisma/client";
import { EmbedBuilder, GuildMember, User } from "discord.js";
import { PrimaryColor } from "../../../constants/Color.constant";

export function UserBindingGroupListEmbed({
    userId,
    userBindingGroupList,
    userBindingGroupPendingRequestList
}: {
    userId: string;
    userBindingGroupList: UserBindingGroup[];
    userBindingGroupPendingRequestList: UserBindingGroupRequest[];
}) {

    let userList: string[] = [];
    let statusList: string[] = [];
    let userIdList: string[] = [];

    if (userBindingGroupList.length > 0) {
        userList = userBindingGroupList.map((userBindingGroup) => `<@${userBindingGroup.userId}>`);
        statusList = userBindingGroupList.map(() => "Active");
        userIdList = userBindingGroupList.map((userBindingGroup) => `\`${userBindingGroup.userId}\``);
    } else {
        userList = [`<@${userId}>`];
        statusList = ["Active"];
        userIdList = [userId];
    }
    
    const userPendingList = userBindingGroupPendingRequestList.map((userBindingGroup) => `<@${userBindingGroup.targetUserId}>`);
    const statusPendingList = userBindingGroupPendingRequestList.map(() => "Pending");
    const userPendingIdList = userBindingGroupPendingRequestList.map((userBindingGroup) => `\`${userBindingGroup.targetUserId}\``);

    return new EmbedBuilder()
        .setTitle("User Binding Group")
        .setColor(PrimaryColor)
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