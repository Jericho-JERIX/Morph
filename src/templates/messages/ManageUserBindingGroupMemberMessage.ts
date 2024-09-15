import { UserBindingGroup, UserBindingGroupRequest } from "@prisma/client";
import { GuildMember } from "discord.js";
import { UserBindingGroupListEmbed } from "../components/Embeds/UserBindingGroupListEmbed";
import { UserBindingManageButtonRow } from "../components/ButtonRows/UserBindingManageButtonRow";
import { getUsersBindingGroup } from "../../service/UserBinding.service";
import { getUserBindingGroupRequests } from "../../service/UserBindingGroupRequest.service";

export async function ManageUserBindingGroupMemberMessage({
    userId,
}: {
    userId: string;
}) {

    const userBindingGroupList = await getUsersBindingGroup(userId);
    const userBindingGroupPendingRequestList = await getUserBindingGroupRequests(userId, { status: "pending" });

    return {
        embeds: [
            UserBindingGroupListEmbed({ userBindingGroupList, userBindingGroupPendingRequestList })
        ],
        components: [
            UserBindingManageButtonRow()
        ]
    }
}