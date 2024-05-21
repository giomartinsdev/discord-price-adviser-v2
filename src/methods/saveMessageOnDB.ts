import { Message } from "discord.js";
import { ProductService } from "../services/ProductService";

export async function saveMessage(message:Message) {
  try {
    const productService = new ProductService();
    await productService.analyzeMessageToSend(message.content);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  
  
}