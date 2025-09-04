import { Text } from "@/components/ui";

import Separator from "@/components/Separator";
import type { ClobToken } from "@/constants/Clob";
import { getMaskedAddress } from "@/utilities/global";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { formatUnits } from "viem";
import TokenSelection from "./TokenSelection";

type FieldProps = {
  token: ClobToken;
  setToken: (token: ClobToken) => void;
  balance: bigint;
  label: "From" | "To";
  amount: string;
  setAmount: (amount: string) => void;
  availableTokens: ClobToken[];
};

export default function SwapField(props: Readonly<FieldProps>) {
  const {
    token,
    setToken,
    label,
    balance,
    setAmount,
    amount,
    availableTokens,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="gap-2">
      <Text className="text-xl font-bold">{label}</Text>
      <View className="bg-white p-4 rounded-md gap-4 ">
        <View className="flex-row justify-between items-center gap-2">
          <TokenSelection
            token={token}
            open={isOpen}
            setOpen={setIsOpen}
            selectToken={setToken}
            availableTokens={availableTokens}
          />
          <TextInput
            className="flex-1 bg-gray-100 rounded-md"
            value={amount}
            onChangeText={(text) => {
              setAmount(text.replace(/[^0-9.]/g, ""));
            }}
            keyboardType="decimal-pad"
            textAlign="right"
          />
          <Button
            title="Max"
            onPress={() => {
              setAmount(formatUnits(balance, token.decimals));
            }}
          />
        </View>
        <Separator />
        <View className="flex-row justify-between">
          <Text>{getMaskedAddress(token.contractAddress ?? "")}</Text>
          <Text>
            {formatUnits(balance, token.decimals)}{" "}
            <Text className="font-bold ">{token.symbol}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
