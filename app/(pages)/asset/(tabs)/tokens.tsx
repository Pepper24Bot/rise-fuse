import { SUPPORTED_TOKENS } from "@/constants/Tokens";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { Address, erc20Abi, formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export default function Tokens() {
  const { address } = useAccount();

  const contract = {
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as Address],
  } as const;

  const { data, isSuccess } = useReadContracts({
    contracts: [
      {
        ...contract,
        address: "0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f" as Address,
      },
      {
        ...contract,
        address: "0x6f6f570f45833e249e27022648a26f4076f48f78" as Address,
      },
      {
        ...contract,
        address: "0xd6e1afe5ca8d00a2efc01b89997abe2de47fdfaf" as Address,
      },
      {
        ...contract,
        address: "0x8a93d247134d91e0de6f96547cb0204e5be8e5d8" as Address,
      },
      {
        ...contract,
        address: "0x40918ba7f132e0acba2ce4de4c4baf9bd2d7d849" as Address,
      },
      {
        ...contract,
        address: "0xf32d39ff9f6aa7a7a64d7a4f00a54826ef791a55" as Address,
      },
    ],
  });

  const balances = useMemo(() => {
    return data ?? [];
  }, [data]);
  console.log("balances:: ", balances);

  return (
    <View>
      {SUPPORTED_TOKENS.map((token, index) => {
        return (
          <View className="flex-row justify-between" key={token.id}>
            <Text>{token.name}</Text>

            <View className="flex-row gap-2">
              <Text>
                {balances[index] && balances[index].result
                  ? formatUnits(balances[index].result, token.decimals ?? 18)
                  : 0}
              </Text>
              <Text className="font-bold">{token.symbol}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
