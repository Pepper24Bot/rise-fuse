/** biome-ignore-all lint/style/noNonNullAssertion: . */
export const ClobTokens = {
  WETH: {
    symbol: "WETH",
    name: "Wrapped Ether",
    contractAddress: "0xd2B8ad86Ba1bF5D31d95Fcd3edE7dA0D4fEA89e4",
    decimals: 18,
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    contractAddress: "0xC23b6B892c947746984474d52BBDF4ADd25717B3",
    decimals: 6,
  },
  WBTC: {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    contractAddress: "0x7C4B1b2953Fd3bB0A4aC07da70b0839d1d09c2cA",
    decimals: 8,
  },
} as const;

export type ClobToken = (typeof ClobTokens)[keyof typeof ClobTokens];

export const TradingBooks = [
  {
    id: 1n,
    base: ClobTokens.WETH,
    quote: ClobTokens.USDC,
    symbol: "WETH/USDC",
    description: "Ethereum / USD Coin",
  },
  {
    id: 2n,
    base: ClobTokens.WBTC,
    quote: ClobTokens.USDC,
    symbol: "WBTC/USDC",
    baseDecimals: 8,
    quoteDecimals: 6,
    description: "Bitcoin / USD Coin",
  },
  {
    id: 3n,
    base: ClobTokens.WETH,
    quote: ClobTokens.WBTC,
    symbol: "WETH/WBTC",
    baseDecimals: 18,
    quoteDecimals: 8,
    description: "Ethereum / Bitcoin",
  },
] as const;
