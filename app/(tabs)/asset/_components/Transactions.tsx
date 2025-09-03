import Text from "@/components/ui/Text";
import { useRouter } from "expo-router";
import {
  ArrowLeftRight,
  Minus,
  MoveDownLeft,
  MoveUpRight,
  Plus,
} from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export default function Transactions() {
  const router = useRouter();

  // TODO: check why flex-1 does not occupy the space equally among children elements
  return (
    <View className="flex-row gap-2 items-center justify-center p-3 mt-8">
      {/* add disabled ui handling */}
      <TouchableOpacity className="min-w-20 px-3 py-2 bg-gray-100 rounded-lg items-center">
        <Plus />
        <Text>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity className="min-w-20 px-3 py-2 bg-gray-100 rounded-lg items-center">
        <Minus />
        <Text>Sell</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/asset/swap");
        }}
        className="min-w-20 px-3 py-2 bg-gray-100 rounded-lg items-center"
      >
        <ArrowLeftRight />
        <Text>Swap</Text>
      </TouchableOpacity>
      <TouchableOpacity className="min-w-20 px-3 py-2 bg-gray-100 rounded-lg items-center">
        <MoveUpRight />
        <Text>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity className="min-w-20 px-3 py-2 bg-gray-100 rounded-lg items-center">
        <MoveDownLeft />
        <Text>Receive</Text>
      </TouchableOpacity>
    </View>
  );
}
