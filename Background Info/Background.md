# Background Info

## Important Notes:

(Note: Remember on initial page load, we'll see the previous values in real time database and update the front end values as soon as the database is updated with new values)

## 1. Data Required For Trending Section (SOL BLOCKCHAIN)

- Token Name (Done) & - Token Address (Done)
- Age in days/ Genesis Date (Done)
- Market Cap (Done)
- Holders Count (Done)
- 24h TXs (Done)
- 24h Volume (Done)
- Price (Done)
- 1m% (Done)
- 5m% (Done)
- 1h% (Done)

## We are getting:

RATE LIMIT INFO:

API ENDPOINT: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d
NECESSARY DATA: id(string), name(string), image(string),current_price(number), market_cap(number),total_volume(number. This is for 24h), price_change_percentage_1h_in_currency(number), price_change_percentage_24h_in_currency(number), price_change_percentage_7d_in_currency(number)

API ENDPOINT: https://api.coingecko.com/api/v3/coins/{id}
NECESSARY DATA: genesis_date(for calculating age in days), coin_id {5 daily -> take id from above. Next day, move to next 5}

LOOKS EXTRA FOR NOW
API ENDPOINT: (CoinMarketCap ID Map) https://pro-api.coinmarketcap.com/v1/cryptocurrency/map
NECESSARY DATA: id(number), name(string)

LOOKS EXTRA FOR NOW
API ENDPOINT: (OHLCV Historical v2) /v2/cryptocurrency/ohlcv/historical
NECESSARY DATA: id(number), 1m%(float)
FORMULA: 1-minute Percentage Change=((close−open)/open)∗100

LOOKS EXTRA FOR NOW
API ENDPOINT:
curl -X GET "https://pro-api.coinmarketcap.com/v4/dex/pairs/ohlcv/latest?contract_address=0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640&network_slug=ethereum&time_period=daily&time_start=2020-01-01&time_end=2020-01-10&count=10&interval=daily&aux=24h_no_of_buys,24h_no_of_sells,holders" \
-H "X-CMC_PRO_API_KEY: be4bfe54-9ab3-45b3-8e40-14d33116a1b1" \
-H "Accept: application/json" \
-H "Content-Type: application/json"
NECESSARY DATA: holders

LOOKS EXTRA FOR NOW
API ENDPOINT:
curl -X GET "https://pro-api.coinmarketcap.com/v4/dex/pairs/ohlcv/historical?time_period=5m&contract_address=0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640&network_slug=ethereum&time_start=2025-01-01T00:00:00Z&time_end=2025-01-02T00:00:00Z&interval=5m&skip_invalid=true" \
-H "X-CMC_PRO_API_KEY: be4bfe54-9ab3-45b3-8e40-14d33116a1b1" \
-H "Accept: application/json"
NECESSARY DATA: 5m%

LOOKS EXTRA FOR NOW
API ENDPOINT:
curl -X GET "https://pro-api.coinmarketcap.com/v4/dex/pairs/ohlcv/historical?time_period=1m&contract_address=0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640&network_slug=ethereum&time_start=2025-01-01T00:00:00Z&time_end=2025-01-02T00:00:00Z&interval=1m&skip_invalid=true" \
-H "X-CMC_PRO_API_KEY: be4bfe54-9ab3-45b3-8e40-14d33116a1b1" \
-H "Accept: application/json"
NECESSARY DATA: 1m%
FORMULA: 1-minute Percentage Change=((close−open)/open)∗100

## 2. Data Required For Discover Section (TRON BLOCKCHAIN)

Tronscan API Key: 480b9403-d3bf-4b6a-bba9-ba08bd9d95c6

## 1. Data Required For Trending Section (TRON BLOCKCHAIN)

1. Wallet Data:

- Wallet address (truncated format)
- TRX balance
- Wallet icons/badges
- Verification status
- Account age/history

2. Performance Metrics:
   1D Performance:

- Percentage change
- USD value change

7D Performance:

- Percentage change
- USD value change
- Win rate percentage
- Number of transactions
- Profit/loss in USD
- Average cost

30D Performance:

- Percentage change
- USD value change

3. Transaction Data:

- Total number of transactions
- Win/loss ratio (e.g., 72/41)
- Transaction distribution:
  - > 500% gains
  - 0-500% gains
  - <-50% losses
  - > -50% losses

4. Token Distribution:

- Visual representation (bar chart)
- Distribution percentages
- Token amounts

5. Time-based Data:

- Last activity timestamp
- Historical performance data
- Activity frequency

Additional Metadata:
Wallet labels/names
Special status indicators
Network status
Current TRX price

# We are getting:

API ENDPOINT: GET /api/account/list?sort=-balance&limit=20&start=0 HTTP/1.0
NECESSARY DATA: wallet address

API ENDPOINT: https://apilist.tronscanapi.com/api/account/analysis?address=TUD4YXYdj2t1gP5th3A7t97mx1AUmrrQRt&type=0&start_timestamp=1514764800000&end_timestamp=1680508422169
NECESSARY DATA: TRX balance

API ENDPOINT:Get the chart of the top holders of stablecoins
https://apilist.tronscanapi.com/api/stableCoin/holder/top
NECESSARY DATA: Smart Money Wallets Data(Wallet Address)

API ENDPOINT: Get account's token list
https://apilist.tronscanapi.com/api/account/tokens?address=TSTVYwFDp7SBfZk7Hrz3tucwQVASyJdwC7&start=0&limit=20&hidden=0&show=0&sortType=0&sortBy=0&token=

TRONSCAN.ORG:

1. PnL:

Excellent! Now that we have a clear view of how to get the price data using the **CoinGecko API**, let’s break down how to integrate it with the transaction data you have from the **Tron API** to calculate the **PnL**.

### Steps to Integrate CoinGecko Data for PnL Calculation:

1. **Use the CoinGecko API for Historical Price Data**:

   - The **CoinGecko API** you provided gives us historical price data of a particular token (e.g., **TRX**) over a time range defined by a **start timestamp** and **end timestamp**.
   - The response from the API provides:
     - `prices`: A list of timestamps and the corresponding price at that timestamp.
     - `market_caps`: A list of timestamps and the corresponding market cap.
     - `total_volumes`: A list of timestamps and the corresponding trading volume.

   ### Example API Request:

   ```bash
   https://api.coingecko.com/api/v3/coins/{id}/market_chart/range?vs_currency=usd&from={start_timestamp}&to={end_timestamp}
   ```

   Replace `{id}` with the coin's API ID (for TRX, it's `tron`), and `{start_timestamp}` and `{end_timestamp}` with the respective Unix timestamps from your transaction data.

2. **How to Use the Data for PnL Calculation**:

   - From the transaction data in the **Tron API**, you get the **timestamp** of each transaction. This timestamp will be used to fetch the price of the token at the time of the transaction from CoinGecko.
   - **Important Fields to Extract**:
     - **Transaction Amount** (from **Tron API**): This tells you how many tokens were involved in the transaction (either bought or sold).
     - **Timestamp** (from **Tron API**): This will help you query the **CoinGecko API** for the price of the token at that exact moment.
     - **Price at Timestamp** (from **CoinGecko API**): The price of the token at the specific timestamp (either at the purchase or sale time).

3. **PnL Calculation Logic**:
   - For each transaction:
     - If the wallet is the **`toAddress`**, it means you **received** tokens (potentially a **purchase**).
     - If the wallet is the **`fromAddress`**, it means you **sent** tokens (potentially a **sale**).
   - Calculate the **value at purchase** (when tokens are bought):
     - Use the **price at the timestamp** of the transaction to calculate the value of the **tokens bought**.
     - **Value at Purchase = Tokens Bought × Price at Purchase Timestamp**.
   - Calculate the **value at sale** (when tokens are sold):
     - Use the **price at the timestamp** when the tokens are sold.
     - **Value at Sale = Tokens Sold × Price at Sale Timestamp**.
   - **PnL** is calculated as:
     - **PnL = Value at Sale - Value at Purchase - Transaction Fees**.

### Example Flow with CoinGecko API:

#### 1. Fetch the Price Data Using CoinGecko API:

Let's say you have a transaction on **January 1st, 2025**, and you want to find the price of TRX at that timestamp.

**API Request**:

```bash
https://api.coingecko.com/api/v3/coins/tron/market_chart/range?vs_currency=usd&from=1672531200&to=1672531200
```

Replace `1672531200` with the actual **Unix timestamp** of the transaction.

**Example Response**:

```json
{
  "prices": [
    [1672531200000, 0.08] // [timestamp, price]
  ]
}
```

In this case, the price of **TRX** at the transaction timestamp is **$0.08**.

#### 2. Calculate the PnL for the Transaction:

- **Transaction Details**:
  - Amount: **10,000 TRX** (received)
  - Timestamp: **1672531200**
  - **Price at the time**: **$0.08** (from the CoinGecko API)
  - Transaction Fee: **0.1 TRX**

**Calculation**:

- **Value at Purchase** = **10,000 TRX × $0.08** = **$800.00**
- **Transaction Fee** = **0.1 TRX × $0.08** = **$0.008** (fee in USD)

If this is a purchase (since your wallet is the `toAddress`), then you are adding **10,000 TRX** to your position at a cost of **$800.00**, minus the fee.

---

### Example for a Sell Transaction:

Let’s say your wallet sells **10,000 TRX**.

#### 1. Fetch the Price at the Time of Sale:

- **API Request**:

```bash
https://api.coingecko.com/api/v3/coins/tron/market_chart/range?vs_currency=usd&from=1672617600&to=1672617600
```

Replace `1672617600` with the actual Unix timestamp when the sell happened.

**Example Response**:

```json
{
  "prices": [
    [1672617600000, 0.085] // [timestamp, price]
  ]
}
```

The price at the time of sale is **$0.085**.

#### 2. Calculate the Sale Value and PnL:

- **Transaction Details**:
  - Amount: **10,000 TRX** (sold)
  - Timestamp: **1672617600**
  - **Price at the time**: **$0.085** (from the CoinGecko API)
  - Transaction Fee: **0.1 TRX**

**Calculation**:

- **Value at Sale** = **10,000 TRX × $0.085** = **$850.00**
- **Transaction Fee** = **0.1 TRX × $0.085** = **$0.0085**

If this is a **sell**, then the **sale proceeds** are **$850.00**, and the net PnL would be calculated based on your **initial purchase** (which would have been at **$0.08**).

- **PnL = Sale Proceeds - Purchase Cost - Fees**
- **PnL = $850.00 - $800.00 - $0.0085** = **$49.9915** profit.

---

### Summary:

- **CoinGecko API** is used to get historical prices at specific timestamps, which allows you to calculate the value of tokens at the time of each transaction.
- **Transaction Type** is determined by whether your wallet is sending or receiving tokens (buying or selling).
- **PnL Calculation** involves comparing the price at the time of purchase and sale, subtracting any gas fees.

By combining the transaction data from the **Tron API** and the price data from **CoinGecko API**, you can calculate the PnL for each transaction in the wallet.

Let me know if you'd like help with the actual code implementation or further explanation!

Certainly! Below is an example of how you can implement the backend code in **NestJS** to handle the PnL calculation by integrating both the **Tron API** for transaction data and the **CoinGecko API** for price data.

We'll create a service to handle the logic of fetching data from both APIs and calculating the PnL, and then expose an endpoint to receive the request and send the response back.

### Steps:

1. **Set up a NestJS project** (if you haven’t already).
2. Create a service to fetch the data from the APIs and calculate the PnL.
3. Set up a controller to expose an endpoint to the frontend.

### Step 1: Set up a NestJS project

If you haven't already set up a NestJS project, you can start by running:

```bash
npm i -g @nestjs/cli
nest new pnl-calculation
```

### Step 2: Install Axios

We’ll use `axios` to fetch data from both **Tron API** and **CoinGecko API**. Install `axios` in your project:

```bash
npm install axios
```

### Step 3: Create the PnL Service

Create a new service to handle the PnL calculation logic. In this service, we’ll:

1. Fetch the transaction data from the **Tron API**.
2. Fetch the price data from the **CoinGecko API**.
3. Calculate the PnL.

```bash
nest generate service pnl
```

Inside the generated `pnl.service.ts` file, the code would look like this:

```typescript
import { Injectable, HttpService } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PnlService {
  constructor() {}

  async calculatePnL(walletAddress: string): Promise<any> {
    // Step 1: Fetch the transaction data from the Tron API
    const transactions = await this.getTransactions(walletAddress);

    // Step 2: Calculate PnL
    let totalPnL = 0;
    for (const transaction of transactions) {
      const { timestamp, amount, fee, fromAddress, toAddress } = transaction;
      const tokenPrice = await this.getTokenPriceAtTimestamp(timestamp);

      // Determine whether the transaction is a buy or sell based on from/to address
      const isBuy = toAddress.toLowerCase() === walletAddress.toLowerCase();
      const isSell = fromAddress.toLowerCase() === walletAddress.toLowerCase();

      // Calculate PnL for buys and sells
      if (isBuy) {
        totalPnL -= amount * tokenPrice + fee;
      } else if (isSell) {
        totalPnL += amount * tokenPrice - fee;
      }
    }

    return { pnl: totalPnL };
  }

  private async getTransactions(walletAddress: string): Promise<any[]> {
    const tronApiUrl = `https://api.tronscanapi.com/api/transaction?fromAddress=${walletAddress}&limit=20`;

    try {
      const response = await axios.get(tronApiUrl);
      return response.data.data;
    } catch (error) {
      throw new Error('Error fetching transactions from Tron API');
    }
  }

  private async getTokenPriceAtTimestamp(timestamp: number): Promise<number> {
    const coingeckoApiUrl = `https://api.coingecko.com/api/v3/coins/tron/market_chart/range?vs_currency=usd&from=${timestamp}&to=${timestamp}`;

    try {
      const response = await axios.get(coingeckoApiUrl);
      const priceData = response.data.prices;
      if (priceData && priceData.length > 0) {
        return priceData[0][1]; // The price is the second element in the array
      }
      throw new Error('Price data not found');
    } catch (error) {
      throw new Error('Error fetching price from CoinGecko API');
    }
  }
}
```

### Explanation of the Code:

- **calculatePnL(walletAddress: string)**: This method takes the wallet address, fetches its transaction data, and calculates the PnL by comparing the prices of tokens at the time of the transaction.
- **getTransactions(walletAddress: string)**: This method fetches the list of transactions for the given wallet address using the **Tron API**.
- **getTokenPriceAtTimestamp(timestamp: number)**: This method fetches the price of the token (TRX) from the **CoinGecko API** at the given timestamp.

### Step 4: Create the Controller

Next, we need to expose an endpoint for the frontend to call. This will be a **GET endpoint** where the frontend can send the wallet address and receive the PnL.

```bash
nest generate controller pnl
```

Inside the `pnl.controller.ts` file:

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { PnlService } from './pnl.service';

@Controller('pnl')
export class PnlController {
  constructor(private readonly pnlService: PnlService) {}

  @Get()
  async getPnL(@Query('walletAddress') walletAddress: string) {
    if (!walletAddress) {
      throw new Error('walletAddress parameter is required');
    }

    try {
      const result = await this.pnlService.calculatePnL(walletAddress);
      return result;
    } catch (error) {
      throw new Error('Error calculating PnL: ' + error.message);
    }
  }
}
```

### Explanation of the Controller:

- **getPnL(@Query('walletAddress') walletAddress: string)**: This endpoint receives the **walletAddress** from the frontend as a query parameter. It then calls the `calculatePnL` method from the service to compute the PnL and returns the result.

### Step 5: Run the Application

Once the code is ready, you can run the NestJS application:

```bash
npm run start
```

### Step 6: Test the API

To test the API, you can send a **GET request** to the following URL:

```
http://localhost:3000/pnl?walletAddress=YOUR_WALLET_ADDRESS
```

Replace `YOUR_WALLET_ADDRESS` with the actual wallet address you want to calculate the PnL for.

### Final Directory Structure:

Your directory structure will look something like this:

```
src
│
├── pnl
│   ├── pnl.controller.ts
│   ├── pnl.service.ts
│
├── app.module.ts
└── main.ts
```

### Notes:

- The **Tron API** URL is limited by the number of transactions it returns. You can adjust the **`limit`** or **`start_timestamp`** parameters to fetch more data.
- The **CoinGecko API** might have caching issues for historical data, so you should handle the responses properly and ensure you don't exceed the cache limits.
- For production, consider adding error handling, logging, and validation (e.g., verifying that the wallet address is in the correct format).

This should give you a complete working backend for calculating PnL based on **Tron transactions** and **CoinGecko historical price data**.

Let me know if you need further clarification or any more enhancements to the code!

---

To calculate **PnL for the last 30 days** for a given wallet address, we'll modify the previous code to ensure we focus on transactions that occurred within the last 30 days. We will fetch transactions from the **Tron API** for the specified wallet address and calculate the PnL by considering the price of the token (TRX) for the corresponding time period.

### Steps to Adjust the Code:

1. **Fetch transactions for the last 30 days**.
2. **Filter transactions** within the last 30 days based on the current date.
3. **Use CoinGecko API** to fetch price data for each transaction timestamp in the last 30 days.

### Adjustments:

- **Calculate the start and end date for the last 30 days**.
- Update the **getTransactions** function to fetch data based on the **30-day range**.
- Modify the **CoinGecko price fetch** to ensure the price is calculated for the corresponding timestamps of transactions within the 30-day window.

### Modified Backend Code in NestJS

Here’s the updated **NestJS** implementation for calculating PnL for the last 30 days.

---

### Step 1: Modify the **PnL Service**

#### Update `pnl.service.ts`:

- We will calculate the date for **30 days ago** and use that to filter the transactions.
- Fetch the price for each transaction within this 30-day range.

```typescript
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PnlService {
  constructor() {}

  // Method to calculate the PnL for the last 30 days
  async calculatePnL(walletAddress: string): Promise<any> {
    // Step 1: Get the start date for the last 30 days
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60; // Get UNIX timestamp for 30 days ago

    // Step 2: Fetch the transaction data from Tron API for the last 30 days
    const transactions = await this.getTransactions(
      walletAddress,
      thirtyDaysAgo,
    );

    // Step 3: Calculate the PnL for each transaction
    let totalPnL = 0;
    for (const transaction of transactions) {
      const { timestamp, amount, fee, fromAddress, toAddress } = transaction;

      // Step 4: Get the token price at the time of transaction
      const tokenPrice = await this.getTokenPriceAtTimestamp(timestamp);

      // Step 5: Determine if it's a buy or sell
      const isBuy = toAddress.toLowerCase() === walletAddress.toLowerCase();
      const isSell = fromAddress.toLowerCase() === walletAddress.toLowerCase();

      // Step 6: Calculate PnL for buys and sells
      if (isBuy) {
        totalPnL -= amount * tokenPrice + fee;
      } else if (isSell) {
        totalPnL += amount * tokenPrice - fee;
      }
    }

    // Step 7: Return the total PnL for the last 30 days
    return { pnl: totalPnL };
  }

  // Fetch transactions from Tron API within the last 30 days
  private async getTransactions(
    walletAddress: string,
    startTimestamp: number,
  ): Promise<any[]> {
    const tronApiUrl = `https://api.tronscanapi.com/api/transaction?fromAddress=${walletAddress}&start_timestamp=${startTimestamp}&limit=100`;

    try {
      const response = await axios.get(tronApiUrl);
      return response.data.data; // Return the transactions data
    } catch (error) {
      throw new Error('Error fetching transactions from Tron API');
    }
  }

  // Fetch the token price at the given timestamp from CoinGecko API
  private async getTokenPriceAtTimestamp(timestamp: number): Promise<number> {
    const coingeckoApiUrl = `https://api.coingecko.com/api/v3/coins/tron/market_chart/range?vs_currency=usd&from=${timestamp}&to=${timestamp}`;

    try {
      const response = await axios.get(coingeckoApiUrl);
      const priceData = response.data.prices;
      if (priceData && priceData.length > 0) {
        return priceData[0][1]; // Extract the price from the response
      }
      throw new Error('Price data not found for timestamp');
    } catch (error) {
      throw new Error('Error fetching price from CoinGecko API');
    }
  }
}
```

### Explanation of Changes:

1. **30-Day Range**:

   - The timestamp for 30 days ago is calculated using `Date.now()` and subtracting the equivalent number of seconds for 30 days.
   - This timestamp is then passed to the **Tron API** to filter transactions that occurred in the last 30 days.

2. **Transaction Fetch**:

   - The `getTransactions` function now takes `start_timestamp` as a parameter and fetches transactions from the **Tron API** that occurred after this timestamp (i.e., within the last 30 days).
   - We’ve also updated the `limit` to 100 (can be adjusted) to fetch up to 100 transactions within the time range.

3. **Token Price at Transaction Timestamp**:

   - The `getTokenPriceAtTimestamp` function fetches the price for each transaction timestamp using the **CoinGecko API**. This allows us to calculate the value of the tokens at the exact time of the transaction.

4. **PnL Calculation**:
   - For each transaction, we determine if it’s a **buy** (tokens received) or **sell** (tokens sent), then calculate the PnL accordingly.

---

### Step 2: Update the **PnL Controller**

#### Modify `pnl.controller.ts`:

Now we need to make sure that we are calling the updated service method that calculates PnL for the last 30 days.

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { PnlService } from './pnl.service';

@Controller('pnl')
export class PnlController {
  constructor(private readonly pnlService: PnlService) {}

  // Endpoint to get PnL for the last 30 days based on wallet address
  @Get()
  async getPnL(@Query('walletAddress') walletAddress: string) {
    if (!walletAddress) {
      throw new Error('walletAddress parameter is required');
    }

    try {
      // Call service to calculate the PnL
      const result = await this.pnlService.calculatePnL(walletAddress);
      return result;
    } catch (error) {
      throw new Error('Error calculating PnL: ' + error.message);
    }
  }
}
```

### Explanation:

- The **`getPnL`** endpoint receives a **walletAddress** as a query parameter, calls the `calculatePnL` method from the service to compute the PnL, and returns the result.

---

### Step 3: Running the Application

Once the code changes are complete, you can run your application:

```bash
npm run start
```

### Step 4: Testing the API

To test the API, send a **GET request** to the following URL, passing the **walletAddress** as a query parameter:

```
http://localhost:3000/pnl?walletAddress=YOUR_WALLET_ADDRESS
```

Replace `YOUR_WALLET_ADDRESS` with the actual wallet address for which you want to calculate the PnL for the last 30 days.

---

### Final Directory Structure:

```
src
│
├── pnl
│   ├── pnl.controller.ts
│   ├── pnl.service.ts
│
├── app.module.ts
└── main.ts
```

---

### Additional Notes:

1. **Handling More Transactions**:

   - If the wallet has more than 100 transactions in the last 30 days, you'll need to implement pagination in the **Tron API** (e.g., using `start` and `limit` parameters) to fetch all transactions.

2. **CoinGecko Rate Limit**:

   - **CoinGecko** has rate limits on the free API. Be mindful of this if you are making many price requests in a short time.

3. **Error Handling**:
   - The code contains basic error handling, but you can improve it by adding better exception handling, retries for failed requests, and logging for production environments.

This setup should give you a robust backend that can calculate the **PnL for the last 30 days** for a specific wallet address based on its transactions and the historical price of **TRX**.

---

Sure! Let's break down the steps to implement this in a NestJS application. The goal is to fetch transaction data (from the **Tronscan API**) and historical price data (from **CoinGecko API**), calculate the 7-day average cost, and then expose an endpoint that the frontend can call.

### Setup

1. **NestJS Setup**:

   - Create a new NestJS application (if you don't have one already).
   - Install necessary dependencies.

   ```bash
   npm install -g @nestjs/cli
   nest new crypto-avg-cost
   cd crypto-avg-cost
   npm install axios
   ```

2. **Create a Service**:

   - This service will interact with both the **Tronscan API** and **CoinGecko API**.
   - It will also handle the logic to calculate the **7-day average cost**.

3. **Create a Controller**:
   - The controller will expose an endpoint that the frontend can call to get the 7-day average cost for a wallet address.

### Code Example

1. **Install Axios for API requests**:

   ```bash
   npm install axios
   ```

2. **Create the Service (crypto.service.ts)**:

   Create a file `src/crypto/crypto.service.ts` to handle the API interactions and calculations.

   ```typescript
   import { Injectable } from '@nestjs/common';
   import axios from 'axios';

   @Injectable()
   export class CryptoService {
     private tronscanUrl = 'https://apilist.tronscanapi.com/api/transaction';
     private coingeckoUrl =
       'https://api.coingecko.com/api/v3/coins/tron/market_chart/range';

     async get7DayAvgCost(walletAddress: string): Promise<number> {
       const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
       const currentTimestamp = Date.now();

       // Step 1: Get Transaction Data for the Wallet from Tronscan
       const transactions = await this.getTransactions(
         walletAddress,
         sevenDaysAgo,
         currentTimestamp,
       );

       // Step 2: Get Historical Price Data from CoinGecko
       const priceData = await this.getHistoricalPrices(
         sevenDaysAgo / 1000,
         currentTimestamp / 1000,
       );

       // Step 3: Calculate the Total Cost and Total Tokens Acquired
       let totalCostInFiat = 0;
       let totalAmountInTokens = 0;

       for (const transaction of transactions) {
         const priceAtTransaction = this.getPriceAtTimestamp(
           priceData,
           transaction.timestamp / 1000,
         );

         // Convert amount to token and fee to fiat
         const transactionAmount =
           transaction.amount /
           Math.pow(10, transaction.tokenInfo.tokenDecimal); // Adjusting for token decimals
         const transactionFee = transaction.cost.fee / Math.pow(10, 6); // Fee is in "sun" for TRX, adjust it.

         // Calculate fiat cost for the transaction (amount * price)
         const transactionCostInFiat =
           (transactionAmount + transactionFee) * priceAtTransaction;

         // Add to totals
         totalCostInFiat += transactionCostInFiat;
         totalAmountInTokens += transactionAmount;
       }

       // Calculate and return 7-day average cost in fiat (USD)
       return totalAmountInTokens > 0
         ? totalCostInFiat / totalAmountInTokens
         : 0;
     }

     // Fetch transactions from Tronscan API
     private async getTransactions(
       walletAddress: string,
       from: number,
       to: number,
     ) {
       const response = await axios.get(this.tronscanUrl, {
         params: {
           toAddress: walletAddress,
           start_timestamp: from,
           end_timestamp: to,
           limit: 200, // Adjust as necessary, pagination may be needed
         },
       });

       return response.data.data;
     }

     // Fetch historical prices from CoinGecko API
     private async getHistoricalPrices(
       fromTimestamp: number,
       toTimestamp: number,
     ) {
       const response = await axios.get(this.coingeckoUrl, {
         params: {
           vs_currency: 'usd',
           from: fromTimestamp,
           to: toTimestamp,
         },
       });

       return response.data.prices; // Array of [timestamp, price] pairs
     }

     // Get the price closest to the transaction timestamp
     private getPriceAtTimestamp(
       prices: [number, number][],
       timestamp: number,
     ): number {
       let closestPrice = 0;
       let closestTimeDiff = Number.MAX_VALUE;

       prices.forEach(([priceTimestamp, price]) => {
         const timeDiff = Math.abs(priceTimestamp - timestamp);
         if (timeDiff < closestTimeDiff) {
           closestTimeDiff = timeDiff;
           closestPrice = price;
         }
       });

       return closestPrice;
     }
   }
   ```

3. **Create the Controller (crypto.controller.ts)**:

   Now, create a controller to expose the endpoint for the frontend to call.

   ```typescript
   import { Controller, Get, Query } from '@nestjs/common';
   import { CryptoService } from './crypto.service';

   @Controller('crypto')
   export class CryptoController {
     constructor(private readonly cryptoService: CryptoService) {}

     @Get('7d-avg-cost')
     async get7DayAvgCost(@Query('wallet') walletAddress: string) {
       if (!walletAddress) {
         return { error: 'wallet address is required' };
       }

       const avgCost = await this.cryptoService.get7DayAvgCost(walletAddress);

       return {
         wallet: walletAddress,
         avgCostInFiat: avgCost,
       };
     }
   }
   ```

4. **Module Setup (app.module.ts)**:

   You need to import the service and controller into the `AppModule`.

   ```typescript
   import { Module } from '@nestjs/common';
   import { CryptoService } from './crypto/crypto.service';
   import { CryptoController } from './crypto/crypto.controller';

   @Module({
     imports: [],
     controllers: [CryptoController],
     providers: [CryptoService],
   })
   export class AppModule {}
   ```

### Running the Application

Now, you can start your NestJS server:

```bash
npm run start
```

This will start the application, and you can access the API endpoint:

```bash
GET http://localhost:3000/crypto/7d-avg-cost?wallet=<WALLET_ADDRESS>
```

Replace `<WALLET_ADDRESS>` with the actual wallet address for which you want to calculate the **7-day average cost** in fiat.

### Example Response

```json
{
  "wallet": "TAWE8B9DXDgTmfr3bhFsjZ4U8Jx4nFTTTT",
  "avgCostInFiat": 1.2345
}
```

This will return the **7-day average cost in USD** (or whichever fiat currency you chose) for the specified wallet address.

### Conclusion

- The **NestJS** service is responsible for fetching **transaction data** from the **Tronscan API** and **historical price data** from **CoinGecko**.
- The **controller** exposes a simple endpoint for the frontend to retrieve the 7-day average cost in fiat currency.
- The calculations account for both the **transaction amount** and **transaction fees**, and the price is dynamically fetched based on the timestamp of each transaction.

Let me know if you'd like to further enhance the solution or need any clarifications!
