import { Text } from "@/components/ui";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import {
  Appearance,
  Button,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header(props: Readonly<BottomTabHeaderProps>) {
  const { route } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  return (
    <View
      className="flex-row bg-background-secondary items-center justify-between p-4"
      style={{ marginTop: insets.top }}
    >
      <TouchableOpacity
        // className="absolute left-4"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Menu />
      </TouchableOpacity>
      <Text className="text-xl">{route.name}</Text>
      <Button
        onPress={() => {
          if (colorScheme === "dark") {
            Appearance.setColorScheme("light");
          } else {
            Appearance.setColorScheme("dark");
          }
        }}
        title={colorScheme === "dark" ? "Light" : "Dark"}
      />
    </View>
  );
}
