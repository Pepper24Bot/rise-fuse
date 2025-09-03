import Text from "@/components/ui/Text";
import { cn } from "@/utilities/global";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { ChevronDown } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

type TabBarProps = MaterialTopTabBarProps;

export default function AssetTabBar(props: Readonly<TabBarProps>) {
  const { state, navigation } = props;
  const navState = navigation.getState();

  const onRoutePress = (name: string, key: string, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return (
    <View className="">
      <View className="flex-row gap-3 py-3">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isActive = navState.index === index;

          return (
            <View
              className={cn("px-3", isActive && "border-b-2 border-b-blue-600")}
              key={route.name}
            >
              <TouchableOpacity
                onPress={() => {
                  onRoutePress(route.name, route.key, isFocused);
                }}
              >
                <Text
                  className={cn(
                    "text-lg text-gray-500",
                    isActive && "font-bold text-black"
                  )}
                >
                  {route.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View className="flex-row gap-1 border border-gray-200 rounded-lg py-2 px-4 items-center justify-end">
        <Text>Sort By</Text>
        <ChevronDown size={18} />
      </View>
    </View>
  );
}
