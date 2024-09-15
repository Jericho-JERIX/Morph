import { GuildSettings } from "@prisma/client";
import { EmbedBuilder } from "discord.js";
import { PrimaryColor } from "../../../constants/Color.constant";

interface MorphServerSettingsEmbedProps {
    guildSettings: GuildSettings
}

function CollectDataStatus(guildSettings: GuildSettings) {
    return guildSettings.allowedCollectData ? "Allowed" : "Disallowed"
}

function CollectDataDate(guildSettings: GuildSettings) {
    return guildSettings.allowedCollectData ? guildSettings.lastDataCollectedDate?.toLocaleString() : "-"
}

function EnableStatus(guildSettings: GuildSettings, enabled: boolean) {
    if (!guildSettings.allowedCollectData) {
        return "- *(Can be actived once **Allow Morph to Collect Server Data** step has done)*"
    }
    return `- **Status**
  ${enabled ? "Enabled" : "Disabled"}`
}

export function MorphServerSettingsEmbed({ guildSettings }: MorphServerSettingsEmbedProps): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("Morph Server Settings")
        .setColor(PrimaryColor)
        .addFields([
            {
                name: "Allow Morph to Collect Server Data",
                value: `Allow Morph to collect roles data for each members in this server and will keep dynamically update anytime member get thier role updated.
- **Status**  
  ${CollectDataStatus(guildSettings)}
- **Upload Guild Members Roles Data**  
  ${CollectDataDate(guildSettings)}`,
                inline: false
            },
            {
                name: "Enable Roles Recovery",
                value: `Let any member on your server can get thier roles back after rejoined the server again.
${EnableStatus(guildSettings, guildSettings.enabledRolesRecovery)}`,
                inline: false
            },
            {
                name: "Enable User Binding Group",
                value: `After this actived, when member get thier role updated, it will also update for every member included in thier user binding group.
${EnableStatus(guildSettings, guildSettings.enabledUserBindingGroup)}`,
                inline: false
            },
        ])
}