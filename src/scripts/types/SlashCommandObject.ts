import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { SlashCommand, SlashCommandV2 } from "./SlashCommand";

export interface SlashCommandObject {
	[name: string]: any ;
};