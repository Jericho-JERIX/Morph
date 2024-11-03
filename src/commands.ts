import { Bind } from "./commands/bind";
import { MagicLink } from "./commands/magic-link";
import { Morph } from "./commands/morph";
import { Unbind } from "./commands/unbind";
import { UploadGuildMembersRoles } from "./commands/upload-guild-members-roles";
import { UserBindingGroup } from "./commands/user-binding-group";
import {
    SlashCommand,
    SlashCommandV2,
} from "./scripts/types/SlashCommand";

export const slashCommands: (
	| SlashCommand
	| SlashCommandV2
)[] = [
	Bind,
	Unbind,
	UploadGuildMembersRoles,
	Morph,
	UserBindingGroup,
	MagicLink,
];
