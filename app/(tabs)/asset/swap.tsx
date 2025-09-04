import { Text } from "@/components/ui";

import { type ClobToken, ClobTokens, TradingBooks } from "@/constants/Clob";
import { UnifiedCLOB } from "@/contracts/clob";
import { MintableERC20 } from "@/contracts/mintableErc20";
import { usePlaceMarketOrder } from "@/hooks/useClob";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { formatUnits, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useReadContracts,
} from "wagmi";
import SwapField from "../_components/Swap/SwapField";

export default function Swap() {
  const [sellToken, setSellToken] = useState<ClobToken>(ClobTokens.WETH);
  const [buyToken, setBuyToken] = useState<ClobToken>(ClobTokens.USDC);
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: balances } = useReadContracts({
    contracts: address
      ? [
          {
            abi: MintableERC20.abi,
            address: sellToken.contractAddress,
            functionName: "balanceOf",
            args: [address],
          },
          {
            abi: MintableERC20.abi,
            address: buyToken.contractAddress,
            functionName: "balanceOf",
            args: [address],
          },
          {
            abi: UnifiedCLOB.abi,
            address:
              UnifiedCLOB.addresses[
                chainId as keyof typeof UnifiedCLOB.addresses
              ],
            functionName: "getBalance",
            args: [address, sellToken.contractAddress],
          },
          {
            abi: UnifiedCLOB.abi,
            address:
              UnifiedCLOB.addresses[
                chainId as keyof typeof UnifiedCLOB.addresses
              ],
            functionName: "getBalance",
            args: [address, buyToken.contractAddress],
          },
        ]
      : [],
  });

  const { sellTokenAvailable, buyTokenAvailable } = useMemo(() => {
    if (!balances || balances.length === 0)
      return {
        sellTokenAvailable: 0n,
        buyTokenAvailable: 0n,
      };
    const sellTokenAvailable =
      (balances[0]?.result ?? 0n) + (balances[2]?.result?.[0] ?? 0n);
    const buyTokenAvailable =
      (balances[1]?.result ?? 0n) + (balances[3]?.result?.[0] ?? 0n);

    return {
      sellTokenAvailable:
        sellTokenAvailable === 0n
          ? 1000n * 10n ** BigInt(sellToken.decimals)
          : sellTokenAvailable,
      buyTokenAvailable:
        buyTokenAvailable === 0n
          ? 1000n * 10n ** BigInt(buyToken.decimals)
          : buyTokenAvailable,
    };
  }, [balances, sellToken, buyToken]);

  const availableSellTokens = useMemo(
    () =>
      TradingBooks.map((book) =>
        book.quote.symbol === buyToken.symbol
          ? book.base
          : book.base.symbol === buyToken.symbol
            ? book.quote
            : null,
      )
        .filter((token): token is ClobToken => token !== null)
        .filter((token, index, array) => array.indexOf(token) === index), // remove duplicates
    [buyToken],
  );
  const availableBuyTokens = useMemo(
    () =>
      TradingBooks.map((book) =>
        book.base.symbol === sellToken.symbol
          ? book.quote
          : book.quote.symbol === sellToken.symbol
            ? book.base
            : null,
      )
        .filter((token): token is ClobToken => token !== null)
        .filter((token, index, array) => array.indexOf(token) === index), // remove duplicates
    [sellToken],
  );
  const tradingBook = useMemo(() => {
    for (const book of TradingBooks) {
      const isSell =
        book.base.symbol === sellToken.symbol &&
        book.quote.symbol === buyToken.symbol;
      const isBuy =
        book.base.symbol === buyToken.symbol &&
        book.quote.symbol === sellToken.symbol;
      if (isSell || isBuy)
        return {
          side: isSell ? "sell" : "buy",
          book,
        } as const;
    }
  }, [sellToken, buyToken]);
  const { data: tradingBookData } = useReadContract({
    abi: UnifiedCLOB.abi,
    address:
      UnifiedCLOB.addresses[chainId as keyof typeof UnifiedCLOB.addresses],
    functionName: "getTradingBook",
    args: tradingBook ? [tradingBook?.book.id] : undefined,
    query: { enabled: tradingBook !== undefined },
  });

  const [sellAmountRaw, setSellAmountRaw] = useState("0");
  const [buyAmountRaw, setBuyAmountRaw] = useState("0");

  const { placeMarketOrder, error, data } = usePlaceMarketOrder();

  useEffect(() => {
    if (!error) return;
    console.error("error placing market order", error);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    console.log("data", data);
  }, [data]);

  const handleSwap = useCallback(() => {
    if (!tradingBook) {
      console.warn("No trading book found for this pair");
      return;
    }

    if (!balances || balances.length !== 4) {
      return;
    }

    const amount =
      tradingBook.book.base.symbol === sellToken.symbol
        ? parseUnits(sellAmountRaw, sellToken.decimals)
        : parseUnits(buyAmountRaw, buyToken.decimals);

    const balance =
      tradingBook.book.base.symbol === sellToken.symbol
        ? (balances[0].result ?? 0n)
        : (balances[1].result ?? 0n);

    const deposit =
      tradingBook.book.base.symbol === sellToken.symbol
        ? (balances[2].result?.[0] ?? 0n)
        : (balances[3].result?.[0] ?? 0n);

    placeMarketOrder({
      amount,
      balance,
      baseToken: tradingBook.book.base,
      quoteToken: tradingBook.book.quote,
      side: tradingBook.side,
      deposit,
    });
  }, [
    sellToken,
    buyToken,
    balances,
    buyAmountRaw,
    sellAmountRaw,
    tradingBook,
    placeMarketOrder,
  ]);

  const handleSellAmountChange = (newSellAmountRaw: string) => {
    setSellAmountRaw(newSellAmountRaw);

    if (!tradingBookData || !tradingBook) {
      return;
    }

    const sellAmount = parseUnits(newSellAmountRaw || "0", sellToken.decimals);
    const price = tradingBookData.lastPrice; // in quote

    if (price === 0n) {
      setBuyAmountRaw("0");
      return;
    }

    if (tradingBook.book.base.symbol === sellToken.symbol) {
      // Selling base token, calculate buy amount
      const buyAmount = sellAmount * price;
      setBuyAmountRaw(
        formatUnits(buyAmount, buyToken.decimals + sellToken.decimals),
      );
    } else {
      // Selling quote token, calculate buy amount
      const buyAmount = (sellAmount * 10n ** BigInt(buyToken.decimals)) / price;
      setBuyAmountRaw(
        formatUnits(buyAmount, buyToken.decimals + sellToken.decimals),
      );
    }
  };

  const handleBuyAmountChange = (newBuyAmountRaw: string) => {
    setBuyAmountRaw(newBuyAmountRaw);

    if (!tradingBookData || !tradingBook) {
      return;
    }

    const buyAmount = parseUnits(newBuyAmountRaw || "0", buyToken.decimals);
    const price = tradingBookData.lastPrice; // in quote

    if (price === 0n) {
      setSellAmountRaw("0");
      return;
    }

    if (tradingBook.book.base.symbol === buyToken.symbol) {
      // Buying base token, calculate sell amount
      const sellAmount = buyAmount * price;
      setSellAmountRaw(
        formatUnits(sellAmount, sellToken.decimals + buyToken.decimals),
      );
    } else {
      // Buying quote token, calculate sell amount
      const sellAmount =
        (buyAmount * 10n ** BigInt(sellToken.decimals)) / price;
      setSellAmountRaw(
        formatUnits(sellAmount, sellToken.decimals + buyToken.decimals),
      );
    }
  };

  return (
    <View className="flex-1 gap-10 p-8 ">
      <SwapField
        amount={sellAmountRaw}
        availableTokens={availableSellTokens}
        balance={sellTokenAvailable}
        label="From"
        setAmount={handleSellAmountChange}
        setToken={setSellToken}
        token={sellToken}
      />
      <SwapField
        amount={buyAmountRaw}
        availableTokens={availableBuyTokens}
        balance={buyTokenAvailable}
        label="To"
        setAmount={handleBuyAmountChange}
        setToken={setBuyToken}
        token={buyToken}
      />
      <Pressable
        className="bg-gray-200 p-4 rounded-lg items-center"
        onPress={handleSwap}
      >
        <Text>Swap</Text>
      </Pressable>
    </View>
  );
}
