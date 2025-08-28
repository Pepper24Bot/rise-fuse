import { usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import SwapFrom from "../_components/Swap/SwapFrom";
import SwapTo from "../_components/Swap/SwapTo";

export default function Swap() {
  const path = usePathname();
  const router = useRouter();
  console.log("path:: ", path);

  return (
    <View className="flex-1 border p-8">
      <SwapFrom />
      <SwapTo />
    </View>
  );
}
