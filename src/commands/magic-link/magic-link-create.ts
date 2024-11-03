import { SlashCommandSubcommandBuilder } from "discord.js";
import { SlashCommandSubcommand } from "../../scripts/types/SlashCommand";

export const MagicLinkCreateSubcommand: SlashCommandSubcommand = {
    
    slashCommandBuilder: new SlashCommandSubcommandBuilder()
        .setName("create")
        .setDescription("Create a magic links"),

    async onCommandExecuted(interaction) {
        interaction.reply({
            content: "This is magic-link create command",
        })
    },
}

