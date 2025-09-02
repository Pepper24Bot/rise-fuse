import Separator from "@/components/Separator";
import TokenSelection from "./TokenSelection";

import { SupportedToken } from "@/types/faucet";
import { getMaskedAddress } from "@/utilities/global";
import { useMemo, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Address, erc20Abi, formatEther, formatUnits } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

type FieldProps = {
  setData: (req: { value: string; token: Partial<SupportedToken> }) => void;
  data: {
    value: string;
    token: Partial<SupportedToken>;
  };
  label: string;
  defaultToken: Partial<SupportedToken>;
};

export default function SwapField(props: Readonly<FieldProps>) {
  const { setData, data, label, defaultToken } = props;

  const [token, setToken] = useState<Partial<SupportedToken>>(defaultToken);
  const [isOpen, setIsOpen] = useState(false);

  const { address } = useAccount();
  const nativeToken = useBalance({
    address,
  });

  const supportedToken = useReadContract({
    query: { enabled: !!address },
    abi: erc20Abi,
    address: token.contractAddress?.toLowerCase() as Address,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const nativeBalance = useMemo(() => {
    return nativeToken.data?.value ? formatEther(nativeToken.data?.value) : 0;
  }, [nativeToken.data?.value]);

  const supportedTokenBalance = useMemo(() => {
    return supportedToken.data
      ? formatUnits(supportedToken.data, token.decimals ?? 18)
      : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportedToken]);

  const balance =
    token.symbol === "ETH" ? nativeBalance : supportedTokenBalance;

  const handleSelectToken = (token: Partial<SupportedToken>) => {
    setData({ ...data, token });
    setToken(token);
  };

  return (
    <View className="gap-2">
      <Text className="text-xl font-bold">{label}</Text>
      <View className="bg-white p-4 rounded-md gap-4 ">
        <View className="flex-row justify-between items-center gap-2">
          <TokenSelection
            token={token}
            open={isOpen}
            setOpen={setIsOpen}
            selectToken={handleSelectToken}
          />
          <TextInput
            className="flex-1 bg-gray-100 rounded-md"
            value={data.value}
            onChangeText={(text) => {
              setData({ ...data, value: text.replace(/[^0-9.]/g, "") });
            }}
            keyboardType="decimal-pad"
            textAlign="right"
          />
          <Button
            title="Max"
            onPress={() => {
              setData({ ...data, value: balance.toString() });
            }}
          />
        </View>
        <Separator />
        <View className="flex-row justify-between">
          <Text>{getMaskedAddress(address ?? "")}</Text>
          <Text>
            {balance} <Text className="font-bold ">{token.symbol}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
