import { GuildSettings } from "@prisma/client";
import { MorphServerSettingsEmbed } from "../components/Embeds/MorphServerSettingsEmbed";
import { AllowCollectionDataButtonRow } from "../components/ButtonRows/AllowCollectionDataButtonRow";
import { ActivePanelButtonRow } from "../components/ButtonRows/ActivePannelButtonRow";

export function MorphServerSettingsMessage(guildSettings: GuildSettings) {
    return {
        embeds: [
            MorphServerSettingsEmbed({ guildSettings })
        ],
        components: guildSettings.allowedCollectData ? [
            AllowCollectionDataButtonRow({ enabled: guildSettings.allowedCollectData }),
            ActivePanelButtonRow({ guildSettings })
        ] : [
            AllowCollectionDataButtonRow({ enabled: guildSettings.allowedCollectData })
        ]
    }
}