import { GuildMember, PartialGuildMember } from "discord.js";
import { recordMemberRoles } from "../actions/RecordMemberRoles";
import { syncRoleAsParent } from "../actions/SyncRolesAsParent";

export function handleGuildMemberUpdate(
	memberBefore: GuildMember | PartialGuildMember,
	memberAfter: GuildMember
) {
    recordMemberRoles(memberBefore, memberAfter)
    syncRoleAsParent(memberBefore, memberAfter)
}
