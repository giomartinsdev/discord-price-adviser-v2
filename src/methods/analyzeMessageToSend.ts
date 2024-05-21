import { Message } from "discord.js";
import { resolveMessageAndProduct } from "./createInfoProduct";
import { config } from "../config/config";
import { saveMessage } from "./saveMessageOnDB";
import { client } from "../index"; 

export async function analyzeMessage(message: Message) {
  if (message.channel.id === config.DISCORD_CHANNEL_ID) {
    const messageContent = message.content.trim();

    if (messageContent) {
      const saveMessageOnDB = await saveMessage(message);
      if (saveMessageOnDB == false) {
        return;
      }

      const data = resolveMessageAndProduct(messageContent);
      const user = await client.users.fetch(config.DISCORD_USER_ID);
      user.send(data.messageInfo.message); // send the message to the user
      console.log(data);
    } else {
      console.log("Mensagem vazia recebida.");
    }
  }
}
