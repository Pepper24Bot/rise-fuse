import { SUPPORTED_TOKENS } from "@/constants/Tokens";
import { SupportedToken } from "@/types/faucet";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import SwapField from "../_components/Swap/SwapField";

export default function Swap() {
  const [fromData, setFromData] = useState<{
    value: string;
    token: Partial<SupportedToken>;
  }>({
    value: "",
    token: SUPPORTED_TOKENS[0],
  });

  const [toData, setToData] = useState<{
    value: string;
    token: Partial<SupportedToken>;
  }>({
    value: "",
    token: SUPPORTED_TOKENS[0],
  });

  const handleSwap = () => {
    console.log("fromData:: ", fromData);
    console.log("toData:: ", toData);
  };

  return (
    <View className="flex-1 gap-10 p-8 ">
      <SwapField
        setData={setFromData}
        data={fromData}
        label="From"
        // TODO: Create Enum for Supported Tokens
        defaultToken={SUPPORTED_TOKENS[0]} // ETH
      />
      <SwapField
        setData={setToData}
        data={toData}
        label="To"
        defaultToken={SUPPORTED_TOKENS[4]} // USDC
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
