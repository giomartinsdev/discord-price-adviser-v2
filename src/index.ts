import "reflect-metadata";
import { Client, Message } from "discord.js";
import { config } from "./config/config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { analyzeMessage } from "./methods/analyzeMessageToSend";
import { AppDataSource } from "./config/ormconfig";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    client.once("ready", () => {
      console.log("Discord bot is ready! 🤖");
    });

    client.on("guildCreate", async (guild) => {
      await deployCommands({ guildId: guild.id });
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;
      const { commandName } = interaction;
      if (commands[commandName as keyof typeof commands]) {
        await commands[commandName as keyof typeof commands].execute(
          interaction
        );
      }
    });

    client.on("messageCreate", async (message: Message) => {
      await analyzeMessage(message);
    });

    client.login(config.DISCORD_TOKEN);
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
