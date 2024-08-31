import { SlashCommand } from "../scripts/types/SlashCommand";

export const Ping: SlashCommand = {
	name: "ping",
	description: "Replies with pong!!!",
	options: [],

	async onCommandExecuted(interaction) {
		// console.log(interaction.member)
	},
};
