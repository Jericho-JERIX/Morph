import { GuildMember } from "discord.js";
import { InviteData, JoinType } from "../types/InvitesTracker.type";
import { assignRoleFromMagicLink } from "../actions/AssignRoleFromMagicLink";

export async function handleTrackerGuildMemberAdd(
	member: GuildMember,
	joinType: JoinType,
	usedInvite: InviteData | null
) {
    if (usedInvite) {
        assignRoleFromMagicLink(member, usedInvite.code);
    } 
}
