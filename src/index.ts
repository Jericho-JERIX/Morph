import InvitesTracker from "@androz2091/discord-invites-tracker";
import { BaseInteraction, Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { responseUserBindingRequest } from "./actions/ResponseUserBindingRequest";
import { slashCommands } from "./commands";
import { handleGuildMemberAdd } from "./events/HandleGuildMemberAdd";
import { handleGuildMemberUpdate } from "./events/HandleGuildMemberUpdate";
import { handleTrackerGuildMemberAdd } from "./events/HandleTrackerGuildMemberAdd";
import { registerCommands } from "./scripts/register";
import { SlashCommandObject } from "./scripts/types/SlashCommandObject";

dotenv.config();
let commands: SlashCommandObject;

const client = new Client({
	intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMembers,
    ],
});

const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});

client.once(Events.ClientReady, async (client) => {
	console.log(`✅ Ready! Logged in as ${client.user?.tag}`);
	commands = await registerCommands(slashCommands);
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
	if (interaction.isChatInputCommand()) {
		await commands[interaction.commandName].onCommandExecuted(interaction);
	} else if (interaction.isButton()) {
        if (!interaction.message.interaction) return
		await commands[
			String(interaction.message.interaction.commandName)
		].onButtonPressed?.(interaction);
	} else if (interaction.isStringSelectMenu()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onMenuSelected?.(interaction);
	} else if (interaction.isAutocomplete()) {
		await commands[String(interaction.commandName)].onAutoCompleteInputed?.(
			interaction
		);
	}
});

tracker.on("guildMemberAdd", handleTrackerGuildMemberAdd)

client.on("guildMemberAdd", handleGuildMemberAdd)
client.on("guildMemberUpdate", handleGuildMemberUpdate)
client.on("interactionCreate", responseUserBindingRequest)

client.login(process.env.TOKEN);