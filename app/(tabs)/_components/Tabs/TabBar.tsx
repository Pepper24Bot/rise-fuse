import { Text, TouchableOpacity, View } from "react-native";

import { cn } from "@/utilities/global";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./TabBarIcon";

type TabBarProps = BottomTabBarProps;

export default function TabBar(props: Readonly<TabBarProps>) {
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
    <View className="flex-row gap-2 px-8 py-3 bg-gray-200">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isActive = navState.index === index;

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => {
              onRoutePress(route.name, route.key, isFocused);
            }}
            // TODO: check how to enable data-... e.g data-active={true}
            className={cn(
              "p-2 flex-1 items-center justify-center",
              isActive && "bg-white rounded-lg"
            )}
          >
            <TabBarIcon name={route.name} />
            <Text>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
