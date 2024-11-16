import { PriceServiceConnection } from "@pythnetwork/price-service-client";

export class PythPriceService {
  connection;
  priceId;

  constructor() {
    this.connection = new PriceServiceConnection("https://hermes.pyth.network");
    this.priceId = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
  }

  async getEmaPrice() {
    try {
      // Fetch the latest price feed
      const priceFeed = await this.connection.getLatestPriceFeeds([this.priceId]);

      // Ensure price feed exists
      if (!priceFeed || priceFeed.length === 0) {
        throw new Error(`No price feed found for priceId: ${this.priceId}`);
      }

      // Extract and return only the emaPrice
      const emaPrice = priceFeed[0].emaPrice?.price || "N/A";
      const result = emaPrice/100000000
      return result;
    } catch (error) {
      console.error("Error fetching EMA price:", error);
      throw error;
    }
  }
}

// // Use an async function to handle the top-level await
// async function main() {
//   const test = new PythPriceService("https://hermes.pyth.network");
//   const result = await test.getEmaPrice();
//   console.log(result);
// }

// main().catch(console.error);
