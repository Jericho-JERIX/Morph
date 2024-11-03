import { SlashCommandBuilder } from "discord.js";
import { MagicLinkViewSubcommand } from "./magic-link-view";
import { MagicLinkCreateSubcommand } from "./magic-link-create";
import { SlashCommandV2 } from "../../scripts/types/SlashCommand";

// const command = new SlashCommandBuilder()
//     .setName("magic-link")
//     .setDescription("Command to view a magic links")

export const MagicLink: SlashCommandV2 = {
    
    slashCommandBuilder: new SlashCommandBuilder()
        .setName("magic-link")
        .setDescription("Command to view a magic links")
        .addSubcommand(MagicLinkViewSubcommand.slashCommandBuilder)
        .addSubcommand(MagicLinkCreateSubcommand.slashCommandBuilder),

    async onCommandExecuted(interaction) {
        // interaction.reply({
        //     content: "This is magic-link command",
        // })
        // console.log(interaction)

        const subcommand = interaction.options.getSubcommand();
        console.log(subcommand)

        if (subcommand === "create") {
            MagicLinkCreateSubcommand.onCommandExecuted(interaction);
        } else if (subcommand === "view") {
            MagicLinkViewSubcommand.onCommandExecuted(interaction);
        }
    },

}