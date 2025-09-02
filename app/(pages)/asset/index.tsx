import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import React from "react";
import Account from "../_components/Account/Account";
import Defi from "./(tabs)/defi";
import Nfts from "./(tabs)/nfts";
import Tokens from "./(tabs)/tokens";
import AssetTabs from "./_components/AssetTabs";
import Transactions from "./_components/Transactions";

const Tab = createMaterialTopTabNavigator();

// Wrapper to enable hooks within TabBar
function CustomTabBar(props: any) {
  return <AssetTabs {...props} />;
}

export default function Asset() {
  return (
    <View className="flex-1 p-6 bg-white">
      <Account />
      <Transactions />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
        }}
        tabBar={CustomTabBar}
      >
        <Tab.Screen name="Token" component={Tokens} />
        <Tab.Screen name="Defi" component={Defi} />
        <Tab.Screen name="NFTs" component={Nfts} />
      </Tab.Navigator>
    </View>
  );
}
