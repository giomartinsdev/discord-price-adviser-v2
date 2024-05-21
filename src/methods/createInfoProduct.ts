import { settings } from "../config/settings";
function extractAndMatchProductInfo(message: string) {
  const priceRegex = /R\$(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/;
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const nameRegex = /(.+?) - R\$/;
  const typeRegex = /@(.+)/;

  const priceMatch = message.match(priceRegex);
  const price = priceMatch
    ? parseFloat(
        priceMatch[0].replace("R$", "").replace(".", "").replace(",", ".")
      )
    : null ?? 0;

  const link = message.match(linkRegex)?.[0];
  const name = message.match(nameRegex)?.[1];
  const type = message.match(typeRegex)?.[1];
  const product_value = price;

  const productMatched = settings.find(
    (product) =>
      message.toLowerCase().includes(product.name.toLowerCase()) &&
      price <= product.value
  );

  return {
    link,
    name,
    type,
    product_value,
    isMatched: !!productMatched,
    product: productMatched,
    message
  };
}

export function resolveMessageAndProduct(message: string) {
  return{
    messageInfo: extractAndMatchProductInfo(message),
  };
}
