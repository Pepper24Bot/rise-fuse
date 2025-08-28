export type FaucetStatusResponse = {
  balance: string;
  dripsToday: number;
  tokens: [
    {
      id: number;
      symbol: string;
      name: string;
      contractAddress: string | null;
      decimals: number;
      isNative: boolean;
      balance: string;
      standardAmount: string;
      active: boolean;
    },
  ];
  active: boolean;
};

export type SupportedToken = {
  id: number;
  symbol: string;
  name: string;
  contractAddress: string | null;
  decimals: number;
  isNative: boolean;
  balance: string;
  standardAmount: string;
  active: boolean;
  isSupported?: boolean;
};

export type TokensResponse = {
  tokens: SupportedToken[];
};

export type MultipleTokensRequest = {
  address: string;
  turnstileToken?: string;
  tokens: string[];
};

export type TokenMintResult = {
  success: boolean;
  tokenSymbol: string;
  tx?: string;
  amount?: string;
  token?: {
    symbol: string;
    name: string;
  };
  txHash?: string;
  message?: string;
};

export type MultipleTokensResponse = {
  success?: boolean;
  message?: string;
  results: TokenMintResult[];
  summary: {
    total: number;
    succeeded: number;
    failed: number;
  };
};

export type TokensEligibilityRequest = {
  address: string;
  tokens: string;
};

export type TokensEligibilityResponse = {
  address: string;
  results: {
    [key: string]: {
      eligible: boolean;
      reason: string;
    }[];
  };
  summary: {
    total: number;
    eligible: number;
    ineligible: number;
  };
};

export type FaucetActivity = {
  drips: [
    {
      amount: string;
      tokenSymbol: string;
      date: string;
      tx: string;
    },
  ];
};
