import { Bind } from "./commands/bind";
import { Morph } from "./commands/morph";
import { Ping } from "./commands/ping";
import { UploadGuildMembersRoles } from "./commands/upload-guild-members-roles";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommands: SlashCommand[] = [
	Ping,
	Bind,
	UploadGuildMembersRoles,
    Morph,
];
