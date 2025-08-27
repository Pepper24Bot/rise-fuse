import { useRouter } from "expo-router";
import { Hooks } from "porto/wagmi";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useAccount, useConnectors } from "wagmi";

export default function Home() {
  const { mutate: disconnect } = Hooks.useDisconnect();
  const { address, isConnected, status } = useAccount();

  const router = useRouter();
  const connectors = useConnectors();

  useEffect(() => {
    // fix this
    if (!isConnected) {
      router.navigate("/welcome");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Disconnect"
        onPress={() => {
          disconnect({ connector: connectors[0] });
        }}
      ></Button>
    </View>
  );
}
