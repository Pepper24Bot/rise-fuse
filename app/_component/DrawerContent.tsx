import Separator from "@/components/Separator";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ArrowLeft } from "lucide-react-native";
import { Hooks } from "porto/wagmi";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useConnectors } from "wagmi";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { mutate: disconnect } = Hooks.useDisconnect();
  const { navigation } = props;

  const insets = useSafeAreaInsets();
  const connectors = useConnectors();

  return (
    <View className="bg-gray-100 flex-1">
      <View
        className="flex-row items-center justify-center p-4"
        style={{ marginTop: insets.top }}
      >
        <TouchableOpacity
          className="absolute left-4"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <ArrowLeft />
        </TouchableOpacity>
        <Text className="text-xl">Settings</Text>
      </View>
      <View className="flex-1 gap-3 bg-white p-4 justify-between">
        <View className="flex-row gap-4 items-center">
          <Text>Preference</Text>
          <Separator />
        </View>
        <TouchableOpacity
          className="p-3 rounded-md bg-gray-100 items-center"
          onPress={() => {
            disconnect({ connector: connectors[0] });
          }}
        >
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
