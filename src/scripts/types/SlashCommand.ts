import { SlashCommandOption } from "./SlashCommandOption";
import {
	Interaction,
	CacheType,
	CommandInteraction,
	ChatInputCommandInteraction,
	ButtonInteraction,
	StringSelectMenuInteraction,
	UserSelectMenuInteraction,
	AutocompleteInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";


export interface SlashCommandBase {
    onCommandExecuted: (
		interaction: ChatInputCommandInteraction
	) => Promise<void>;
	onButtonPressed?: (interaction: ButtonInteraction) => Promise<void>;
	onMenuSelected?: (
		interaction: StringSelectMenuInteraction
	) => Promise<void>;
	onAutoCompleteInputed?: (
		interaction: AutocompleteInteraction
	) => Promise<void>;
}

export interface SlashCommand extends SlashCommandBase {
	name: string;
	description: string;
	options: SlashCommandOption[];
};

export interface SlashCommandV2 extends SlashCommandBase {
	slashCommandBuilder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
};

export interface SlashCommandSubcommand extends SlashCommandBase {
	slashCommandBuilder: SlashCommandSubcommandBuilder
};