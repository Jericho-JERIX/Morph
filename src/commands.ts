import { Bind } from "./commands/bind";
import { Morph } from "./commands/morph";
import { Unbind } from "./commands/unbind";
import { UploadGuildMembersRoles } from "./commands/upload-guild-members-roles";
import { UserBindingGroup } from "./commands/user-binding-group";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommands: SlashCommand[] = [
	Bind,
    Unbind,
	UploadGuildMembersRoles,
    Morph,
    UserBindingGroup,
];
