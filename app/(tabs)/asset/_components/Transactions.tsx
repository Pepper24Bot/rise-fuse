import { Button, Icon } from "@/components/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Transactions() {
  const router = useRouter();

  return (
    <View className="flex-row gap-2 items-center justify-center p-3 mt-8">
      <Button
        title="Buy"
        icon={<Icon name="Plus" />}
        className="min-w-20 px-3 py-2"
      />
      <Button
        title="Sell"
        icon={<Icon name="Minus" />}
        className="min-w-20 px-3 py-2"
      />
      <Button
        title="Swap"
        icon={<Icon name="ArrowLeftRight" />}
        className="min-w-20 px-3 py-2"
        onPress={() => {
          router.navigate("/asset/swap");
        }}
      />
      <Button
        title="Send"
        icon={<Icon name="MoveUpRight" />}
        className="min-w-20 px-3 py-2"
      />
      <Button
        title="Receive"
        icon={<Icon name="MoveDownLeft" />}
        className="min-w-20 px-3 py-2"
      />
    </View>
  );
}
