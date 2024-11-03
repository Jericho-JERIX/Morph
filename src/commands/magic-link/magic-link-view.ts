import { SlashCommandSubcommandBuilder } from "discord.js";
import { SlashCommandSubcommand } from "../../scripts/types/SlashCommand";

export const MagicLinkViewSubcommand: SlashCommandSubcommand = {
    
    slashCommandBuilder: new SlashCommandSubcommandBuilder()
        .setName("view")
        .setDescription("View a magic links"),

    async onCommandExecuted(interaction) {
        interaction.reply({
            content: "This is magic-link view command",
        })
    },
}

