import React from "react";
import { View } from "react-native";
import Account from "./_components/Account/Account";
import Transactions from "./_components/Asset/Transactions";

export default function Asset() {
  return (
    <View className="flex-1 p-8 bg-white">
      <Account />
      <Transactions />
    </View>
  );
}
