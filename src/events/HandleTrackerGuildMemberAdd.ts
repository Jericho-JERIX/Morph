import { GuildMember } from "discord.js";
import { InviteData, JoinType } from "../types/InvitesTracker.type";

export async function handleTrackerGuildMemberAdd(
	member: GuildMember,
	joinType: JoinType,
	usedInvite: InviteData | null
) {
	console.log('member', member);
	console.log('joinType', joinType);
	console.log('usedInvite', usedInvite);
}
