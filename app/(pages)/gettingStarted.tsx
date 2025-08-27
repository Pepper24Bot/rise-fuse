import { asyncStorage } from "@/utilities/storage";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function GettingStarted() {
  const router = useRouter();

  const onGetStarted = async () => {
    try {
      // TODO: Change this key
      await asyncStorage.setItem("hasUserStarted", "true");
      console.log("[Button]: Get Started");
    } catch (error) {
      console.log("[Button]: Failed to store if User Started", error);
    }
  };

  const routeToLogin = async () => {
    const hasUserStarted = await asyncStorage.getItem("hasUserStarted");
    console.log("[Check]: User already initiated: ", hasUserStarted === "true");

    // TODO: route to login page after the animation
    if (hasUserStarted === "true") {
      router.navigate("/login");
    }
  };

  useEffect(() => {
    routeToLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Implement handling of dark and light mode
  return (
    <View className="flex-1 relative flex-col justify-center p-12 bg-blue-400">
      <View className="absolute left-12">
        <Image
          source={require("../../assets/logo/rise.png")}
          className="w-[320px] max-h-[400px] mb-8"
        />
        <Text className="font-bold text-4xl text-white">Infinite Speed</Text>
        <Text className="text-white">
          The fastest blockchain, secured by Ethereum.
        </Text>
      </View>

      <View className="flex-1 gap-4 pt-4 justify-end">
        <Link href="/login" asChild>
          <Pressable className="bg-white p-4 rounded-lg" onPress={onGetStarted}>
            <Text className="text-center">Get Started</Text>
          </Pressable>
        </Link>
        <View className="flex-row gap-4 justify-center">
          <Link href="/" target="_blank" asChild className="underline">
            <Text className="text-white">Telegram</Text>
          </Link>
          <Link href="/" target="_blank" asChild className="underline">
            <Text className="text-white">Discord</Text>
          </Link>
          <Link href="/" target="_blank" asChild className="underline">
            <Text className="text-white">X</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
