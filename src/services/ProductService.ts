import { Repository } from "typeorm";
import { AppDataSource } from "../config/ormconfig";
import { Product } from "../entities/ProductEntity";
import { resolveMessageAndProduct } from "../methods/createInfoProduct";

export class ProductService {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async analyzeMessageToSend(message: string) {
    const data = this.extractAndMatchProductInfo(message).messageInfo;

    const newProduct = this.productRepository.create({
      product_link: data.link,
      product_name: data.name,
      product_value: data.product_value,
      product_type: data.type,
    });
    await this.productRepository.save(newProduct);
  }

  extractAndMatchProductInfo(message: string) {
    return resolveMessageAndProduct(message);
  }
}
