import { getMaskedAddress } from "@/utilities/global";
import { Copy, ExternalLink, Eye } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useAccount, useBalance } from "wagmi";

export default function Account() {
  const { isConnected, address } = useAccount();
  const balance = useBalance({ address });

  const amount = useMemo(() => {
    return balance ? balance.data?.value : 0;
  }, [balance]);

  return (
    <View className="flex-row justify-between items-center">
      <View>
        <View className="flex-row items-center gap-6">
          <Text className="text-lg">{getMaskedAddress(address ?? "")}</Text>
          <View className="flex-row gap-2 items-center">
            <Pressable>
              <Copy size={16} />
            </Pressable>
            <Pressable>
              <Eye size={20} />
            </Pressable>
          </View>
        </View>
        {/* TODO: Check how to get all the assets of an address and how to convert them into a chosen fiat currency */}
        <Text className="font-bold text-4xl">
          {amount} {balance.data?.symbol}
        </Text>
      </View>
      <Pressable className="px-4 py-2 bg-gray-200 rounded-lg flex-row items-center gap-2">
        <Text>Portfolio</Text>
        <ExternalLink size={18} />
      </Pressable>
    </View>
  );
}
