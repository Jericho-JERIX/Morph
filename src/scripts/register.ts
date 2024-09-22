import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import { SlashCommand } from "./types/SlashCommand";
import { SlashCommandObject } from "./types/SlashCommandObject";

dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID }: any = process.env;

const rest = new REST({
	version: "10",
}).setToken(TOKEN);

export async function registerCommands(
	slashCommands: SlashCommand[]
): Promise<SlashCommandObject> {
	const commands = slashCommands;

	let commandsObject: SlashCommandObject = {};

	for (const command of commands) {
		commandsObject[command.name] = command;
	}

	try {
		await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: commands,
		});
		console.log(`✅ Successfully registered ${commands.length} commands.`);
		return commandsObject;
	} catch (error) {
		console.error(error);
		return {};
	}
}
