import { createDrawerNavigator } from "@react-navigation/drawer";
import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAccount } from "wagmi";

import TabNavigator from "./(tabs)/_components/TabNavigator";
import DrawerContent from "./_component/DrawerContent";

const Drawer = createDrawerNavigator();

export default function Main() {
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

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

  // console.log("");

  return (
    <SafeAreaProvider>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: "back",
          drawerStyle: { width: "100%" },
        }}
        drawerContent={DrawerContent}
        backBehavior="history"
      >
        <Drawer.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
}
