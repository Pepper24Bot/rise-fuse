import { useCallback, useMemo, useState } from "react";
import { encodeFunctionData, type Hex, maxUint256 } from "viem";
import { useAccount, usePublicClient, useSendCalls } from "wagmi";
import { type ClobToken, TradingBooks } from "@/constants/Clob";
import { UnifiedCLOB } from "@/contracts/clob";
import { MintableERC20 } from "@/contracts/mintableErc20";

export function usePlaceMarketOrder() {
  const {
    sendCalls,
    error: _error,
    isError: _isError,
    isPending,
    isSuccess,
    status: _status,
    data,
  } = useSendCalls();
  const client = usePublicClient();
  const account = useAccount();

  const [placeMarketOrderError, setError] =
    useState<PlaceMarketOrderError | null>(null);

  const isError = useMemo(
    () => _isError || placeMarketOrderError !== null,
    [_isError, placeMarketOrderError],
  );

  const error = useMemo(
    () => _error || placeMarketOrderError,
    [_error, placeMarketOrderError],
  );

  const status = useMemo(() => {
    if (placeMarketOrderError) return "error";
    return _status;
  }, [_status, placeMarketOrderError]);

  const placeMarketOrder = useCallback(
    async ({
      amount,
      baseToken,
      quoteToken,
      side,
      balance,
      deposit,
    }: {
      amount: bigint;
      baseToken: ClobToken;
      quoteToken: ClobToken;
      side: "buy" | "sell";
      balance: bigint;
      deposit: bigint;
    }) => {
      setError(null);

      const calls: { to: Hex; data?: Hex; value?: bigint }[] = [];

      if (!client || account.status !== "connected") return;

      const clobAddress =
        UnifiedCLOB.addresses[
          account.chainId as keyof typeof UnifiedCLOB.addresses
        ];
      if (!clobAddress) return setError(new UnsupportedChainError());

      const tokenToTransfer = side === "buy" ? quoteToken : baseToken;

      const allowance = await client.readContract({
        abi: MintableERC20.abi,
        address: tokenToTransfer.contractAddress,
        functionName: "allowance",
        args: [account.address, clobAddress],
      });

      if (balance === 0n) {
        calls.push({
          to: tokenToTransfer.contractAddress,
          data: encodeFunctionData({
            abi: MintableERC20.abi,
            functionName: "mint",
            args: [
              account.address,
              1000n * 10n ** BigInt(tokenToTransfer.decimals),
            ],
          }),
        });
      }

      if (allowance !== maxUint256) {
        calls.push({
          to: tokenToTransfer.contractAddress,
          data: encodeFunctionData({
            abi: MintableERC20.abi,
            functionName: "approve",
            args: [clobAddress, maxUint256],
          }),
        });
      }

      const book = TradingBooks.find(
        (book) =>
          book.base.symbol === baseToken.symbol &&
          book.quote.symbol === quoteToken.symbol,
      );

      if (!book) return setError(new TradingBookNotFoundError());

      const toDeposit = amount - deposit;
      if (toDeposit > balance && balance !== 0n) {
        return setError(new InsufficientBalance());
      }
      if (toDeposit > 0n) {
        calls.push({
          to: clobAddress,
          data: encodeFunctionData({
            abi: UnifiedCLOB.abi,
            functionName: "deposit",
            args: [tokenToTransfer.contractAddress, toDeposit],
          }),
        });
      }

      calls.push({
        to: clobAddress,
        data: encodeFunctionData({
          abi: UnifiedCLOB.abi,
          functionName: "placeMarketOrder",
          args: [book.id, side === "buy" ? 0 : 1, amount, 100n],
        }),
      });

      sendCalls({
        calls,
        forceAtomic: true,
      });
    },
    [client, sendCalls, account],
  );

  return {
    placeMarketOrder,
    error,
    isError,
    isPending,
    isSuccess,
    status,
    data,
  };
}

export class TradingBookNotFoundError extends Error {
  constructor(message?: string) {
    super(message || "Trading book not found");
    this.name = "TradingBookNotFoundError";
  }
}

export class UnsupportedChainError extends Error {
  constructor(message?: string) {
    super(message || "Unsupported chain");
    this.name = "UnsupportedChainError";
  }
}

export class InsufficientBalance extends Error {
  constructor(message?: string) {
    super(message || "Insufficient balance");
    this.name = "InsufficientBalance";
  }
}

export type PlaceMarketOrderError =
  | TradingBookNotFoundError
  | UnsupportedChainError;
