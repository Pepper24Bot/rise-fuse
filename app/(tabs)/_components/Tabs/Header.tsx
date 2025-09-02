import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header(props: Readonly<BottomTabHeaderProps>) {
  const { route } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  console.log("props:: ", props);

  return (
    <View
      className="flex-row bg-gray-100 items-center justify-center p-4"
      style={{ marginTop: insets.top }}
    >
      <Pressable
        className="absolute left-4"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Menu />
      </Pressable>
      <Text className="text-xl">{route.name}</Text>
    </View>
  );
}
