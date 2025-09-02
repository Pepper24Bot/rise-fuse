import { createDrawerNavigator } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Hooks } from "porto/wagmi";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAccount, useConnectors } from "wagmi";
import TabNavigator from "./(tabs)/_components/TabNavigator";

const Drawer = createDrawerNavigator();

export default function Main() {
  const { mutate: disconnect } = Hooks.useDisconnect();
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  const connectors = useConnectors();
  const router = useRouter();

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
    <SafeAreaProvider>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
}
