import TokenETH from "@/assets/icons/tokens/eth.svg";
import TokenMOG from "@/assets/icons/tokens/mog.svg";
import TokenPEPE from "@/assets/icons/tokens/pepe.svg";
import TokenRISE from "@/assets/icons/tokens/rise.svg";
import TokenUSDC from "@/assets/icons/tokens/usdc.svg";
import TokenUSDT from "@/assets/icons/tokens/usdt.svg";
import TokenWBTC from "@/assets/icons/tokens/wbtc.svg";

import { Text } from "@/components/ui";

import { SUPPORTED_TOKENS } from "@/constants/Tokens";
import { useMemo } from "react";
import { View } from "react-native";
import { Address, erc20Abi, formatEther, formatUnits } from "viem";
import { useAccount, useBalance, useReadContracts } from "wagmi";

export default function Tokens() {
  const { address } = useAccount();

  const contract = {
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as Address],
  } as const;

  const { data: nativeBalance } = useBalance({ address });

  const nativeToken = SUPPORTED_TOKENS[0]; // ETH

  const supportedTokens = SUPPORTED_TOKENS.filter((token) => {
    return !token.isNative;
  });

  const getContracts = () => {
    return supportedTokens.map((token) => {
      return {
        ...contract,
        address: token.contractAddress as Address,
      };
    });
  };

  // TODO: Change to porto's Hooks.useAssets as soon as available
  const { data } = useReadContracts({
    contracts: getContracts(),
  });

  const balances = useMemo(() => {
    const tokensBalance = data?.map((balance) => {
      return balance.result;
    });

    return tokensBalance ?? [];
  }, [data]);

  const getTokenIcon = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case "ETH":
        return <TokenETH width={40} height={40} />;
      case "USDC":
        return <TokenUSDC width={40} height={40} />;
      case "USDT":
        return <TokenUSDT width={40} height={40} />;
      case "PEPE":
        return <TokenPEPE width={40} height={40} />;
      case "WBTC":
        return <TokenWBTC width={40} height={40} />;
      case "MOG":
        return <TokenMOG width={40} height={40} />;
      case "RISE":
        return <TokenRISE width={40} height={28} />;
      default:
        return null;
    }
  };

  return (
    <View className="gap-3 bg-white flex-1 pt-4">
      {/* Native Token */}
      <View className="flex-row items-center justify-between py-2">
        <View className="flex-row items-center  gap-3">
          {getTokenIcon("ETH")}
          <View>
            <Text className="font-bold">{nativeToken.symbol}</Text>
            <View className="flex-row gap-2">
              {/* TODO: Change when indexer is ready */}
              <Text className="text-gray-400">$4,633.06</Text>
              {/* TODO: Change when indexer is ready - APY*/}
              <Text className="text-green-700">+7.98%</Text>
            </View>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-bold">
            {formatEther(nativeBalance?.value ?? 0n)}
          </Text>
          {/* TODO: Change when indexer is ready */}
          <Text className="text-gray-400">$48.7</Text>
        </View>
      </View>

      {supportedTokens.map((token, index) => {
        return (
          <View
            className="flex-row items-center justify-between py-2"
            key={token.id}
          >
            <View className="flex-row gap-4 items-center ">
              {getTokenIcon(token.symbol ?? "")}
              <View>
                <Text className="font-bold">{token.symbol}</Text>
                <View className="flex-row gap-2">
                  {/* TODO: Change when indexer is ready */}
                  <Text className="text-gray-400">$0.99967</Text>
                  {/* TODO: Change when indexer is ready - APY*/}
                  <Text className="text-green-700">+7.98%</Text>
                </View>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-bold">
                {balances
                  ? formatUnits(balances[index] ?? 0n, token.decimals ?? 18)
                  : 0}
              </Text>
              {/* TODO: Change when indexer is ready */}
              <Text className="text-gray-400">$48.7</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
