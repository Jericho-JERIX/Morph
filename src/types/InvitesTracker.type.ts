import { Snowflake, User } from "discord.js";

export type JoinType = 'permissions' | 'normal' | 'vanity' | 'unknown';

export interface InviteData {
    guildId: Snowflake;
    code: string;
    url: string;
    uses: number | null;
    maxUses: number | null;
    maxAge: number | null;
    createdTimestamp: number | null;
    inviter: User | null;
}