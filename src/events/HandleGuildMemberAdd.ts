import { GuildMember } from "discord.js";
import { syncRolesToMember } from "../actions/SyncRolesToMember";

export function handleGuildMemberAdd(member: GuildMember) {
	syncRolesToMember(member);
}
