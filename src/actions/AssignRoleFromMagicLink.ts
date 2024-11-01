import { GuildMember } from "discord.js";
import { getMagicLinkByCode } from "../service/MagicLink.service";

export async function assignRoleFromMagicLink(member: GuildMember, code: string) {

    const magicLink = await getMagicLinkByCode(code);

    if (!magicLink) {
        return;
    }

    try {
        member.roles.add(magicLink.roleId);
    } catch (error) {}

}