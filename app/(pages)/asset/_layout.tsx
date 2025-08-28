import { Stack } from "expo-router";

export default function AssetLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="swap"
        options={{ title: "Swap", headerShown: true }}
      />
    </Stack>
  );
}
