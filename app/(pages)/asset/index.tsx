import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import Separator from "@/components/Separator";
import React from "react";
import Account from "../_components/Account/Account";
import Transactions from "../_components/Asset/Transactions";
import Defi from "./(tabs)/defi";
import Nfts from "./(tabs)/nfts";
import Tokens from "./(tabs)/tokens";

const Tab = createMaterialTopTabNavigator();

export default function Asset() {
  return (
    <View className="flex-1 p-8 bg-white">
      <Account />
      <Transactions />
      <Separator />
      <Tab.Navigator
        screenOptions={{
          //  tabBarPosition: "top",
          tabBarActiveTintColor: "blue",
        }}
      >
        <Tab.Screen name="Token" component={Tokens} />
        <Tab.Screen name="Defi" component={Defi} />
        <Tab.Screen name="NFTs" component={Nfts} />
      </Tab.Navigator>
    </View>
  );
}
