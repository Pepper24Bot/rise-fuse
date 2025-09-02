import React from "react";
import Asset from "../asset";
import History from "../history";
import Home from "../home";
import Market from "../market";
import Trade from "../trade";
import Header from "./Tabs/Header";
import TabBar from "./Tabs/TabBar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: Header,
        // headerRight: () => {
        //   return (
        //     <Button
        //       title="Disconnect"
        //       onPress={() => {
        //         disconnect({ connector: connectors[0] });
        //       }}
        //     />
        //   );
        // },
      }}
      tabBar={TabBar}
      initialRouteName="Asset" // temporary
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Asset" component={Asset} />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}
