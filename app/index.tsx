import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { Hooks } from "porto/wagmi";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { useAccount, useConnectors } from "wagmi";

import TabBar from "./(pages)/_components/Tabs/TabBar";
import Asset from "./(pages)/asset";
import History from "./(pages)/history";
import Home from "./(pages)/home";
import Market from "./(pages)/market";
import Trade from "./(pages)/trade";

// Wrapper to enable hooks within TabBar
function CustomTabBar(props: any) {
  return <TabBar {...props} />;
}

function CustomHeader() {
  return <View className="bg-gray-200" />;
}

export default function Main() {
  const { mutate: disconnect } = Hooks.useDisconnect();
  const { isConnected } = useAccount();
  const connectors = useConnectors();

  const [isMounted, setIsMounted] = useState(false);

  const Tab = createBottomTabNavigator();

  const router = useRouter();

  // TODO: Implement routing with authentication
  useEffect(() => {
    // fix this
    setIsMounted(true);
    if (!isConnected && isMounted) {
      router.navigate("/gettingStarted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isMounted, router]);

  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          // headerShown: false,
          headerBackground: CustomHeader,
          headerRight: () => {
            return (
              <Button
                title="Disconnect"
                onPress={() => {
                  disconnect({ connector: connectors[0] });
                }}
              />
            );
          },
        }}
        tabBar={CustomTabBar}
        initialRouteName="Asset" // temporary
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Market" component={Market} />
        <Tab.Screen name="Asset" component={Asset} />
        <Tab.Screen name="Trade" component={Trade} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </View>
  );
}
