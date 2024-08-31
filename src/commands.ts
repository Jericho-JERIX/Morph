import { Bind } from "./commands/bind";
import { Ping } from "./commands/ping";
import { UploadGuildMembersRoles } from "./commands/upload-guild-members-roles";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommands: SlashCommand[] = [Ping, Bind, UploadGuildMembersRoles];
