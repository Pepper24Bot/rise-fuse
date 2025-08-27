import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { Hooks } from "porto/wagmi";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAccount, useConnectors } from "wagmi";

import TabBar from "./(pages)/_components/Tabs/TabBar";
import Asset from "./(pages)/asset";
import History from "./(pages)/history";
import Market from "./(pages)/market";
import Trade from "./(pages)/trade";

// Wrapper to enable hooks within TabBar
function CustomTabBar(props: any) {
  return <TabBar {...props} />;
}

export default function Main() {
  const { mutate: disconnect } = Hooks.useDisconnect();
  const { address, isConnected, status } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  const Tab = createBottomTabNavigator();

  const router = useRouter();
  const connectors = useConnectors();

  // TODO: Implement routing with authentication
  useEffect(() => {
    // fix this
    setIsMounted(true);
    if (!isConnected && isMounted) {
      router.navigate("/gettingStarted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isMounted]);

  return (
    <View className="flex-1">
      {/* <Button
        title="Disconnect"
        onPress={() => {
          disconnect({ connector: connectors[0] });
        }}
      /> */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={CustomTabBar}
      >
        <Tab.Screen name="Home" component={Asset} />
        <Tab.Screen name="Market" component={Market} />
        <Tab.Screen name="Asset" component={Asset} />
        <Tab.Screen name="Trade" component={Trade} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </View>
  );
}
