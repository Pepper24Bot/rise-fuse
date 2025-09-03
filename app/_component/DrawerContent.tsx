import Separator from "@/components/Separator";
import Text from "@/components/ui/Text";

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ArrowLeft } from "lucide-react-native";
import { Hooks } from "porto/wagmi";
import {
  Appearance,
  Button,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useConnectors } from "wagmi";

export default function DrawerContent(
  props: Readonly<DrawerContentComponentProps>
) {
  const { navigation } = props;
  const { mutate: disconnect } = Hooks.useDisconnect();

  const colorScheme = useColorScheme();
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
      <View className="flex-1 gap-3 bg-primary p-4 justify-between">
        <View className="gap-4">
          <View className="flex-row gap-4 items-center">
            <Text className="font-bold">Preference</Text>
            <Separator />
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-xl">Theme</Text>
            {/* <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              onValueChange={toggleSwitch}
              value={isDark}
            /> */}
            <View className="flex-row rounded-md overflow-hidden">
              <Button
                disabled={colorScheme === "dark"}
                title="Dark"
                onPress={() => {
                  Appearance.setColorScheme("dark");
                }}
              />
              <Button
                disabled={colorScheme === "light"}
                title="Light"
                onPress={() => {
                  Appearance.setColorScheme("light");
                }}
              />
            </View>
          </View>
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
