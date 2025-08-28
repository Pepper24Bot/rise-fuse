import { useRouter } from "expo-router";
import {
  ArrowLeftRight,
  DollarSign,
  Minus,
  MoveDownLeft,
  MoveUpRight,
  Plus,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Transactions() {
  const router = useRouter();

  // TODO: check why flex-1 does not occupy the space equally among children elements
  return (
    <View className="flex-row gap-2 items-center justify-center p-3 mt-8">
      {/* add disabled ui handling */}
      <Pressable className="min-w-14 px-3 py-2 bg-gray-200 rounded-lg items-center opacity-50">
        <Plus />
        <Text>Buy</Text>
      </Pressable>
      <Pressable className="min-w-14 px-3 py-2 bg-gray-200 rounded-lg items-center opacity-50">
        <Minus />
        <Text>Sell</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("/swap");
        }}
        className="min-w-14 px-3 py-2 bg-gray-200 rounded-lg items-center"
      >
        <ArrowLeftRight />
        <Text>Swap</Text>
      </Pressable>
      <Pressable className="min-w-14 px-3 py-2 bg-gray-200 rounded-lg items-center opacity-50">
        <MoveUpRight />
        <Text>Send</Text>
      </Pressable>
      <Pressable className="min-w-14 px-3 py-2 bg-gray-200 rounded-lg items-center opacity-50">
        <MoveDownLeft />
        <Text>Receive</Text>
      </Pressable>
      <Pressable className="min-w-14 px-3 py-2 bg-gray-200 rounded-lg items-center opacity-50">
        <DollarSign />
        <Text>Earn</Text>
      </Pressable>
    </View>
  );
}
