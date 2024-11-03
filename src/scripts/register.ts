import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import { SlashCommand, SlashCommandSubcommand, SlashCommandV2 } from "./types/SlashCommand";
import { SlashCommandObject } from "./types/SlashCommandObject";

dotenv.config();

const { TOKEN, CLIENT_ID }: any = process.env;

const rest = new REST({
	version: "10",
}).setToken(TOKEN);

export async function registerCommands(
	slashCommands: (SlashCommand | SlashCommandV2)[]
): Promise<SlashCommandObject> {
    
    let commandsObject: SlashCommandObject = {};
    
	for (const command of slashCommands) {

        if ('name' in command) {
            commandsObject[command.name] = command;
        } else if ('slashCommandBuilder' in command) {
            commandsObject[command.slashCommandBuilder.name] = command;
        }

	}
    
    const commands = slashCommands.map((command) => {
        if ('name' in command) {
            return command;
        } else {
            return command.slashCommandBuilder.toJSON()
        }
    });

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
