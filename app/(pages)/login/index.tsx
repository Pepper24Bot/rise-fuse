import Separator from "@/components/Separator";
import { Link, useRouter } from "expo-router";
import { Hooks } from "porto/wagmi";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useAccount, useConnectors } from "wagmi";

export default function Login() {
  const router = useRouter();

  const { mutate: connect, error: connectError } = Hooks.useConnect();
  const { mutate: disconnect } = Hooks.useDisconnect();
  const { address, isConnected, status } = useAccount();
  const connectors = useConnectors();

  useEffect(() => {
    // fix this
    if (isConnected) {
      router.navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <View className="flex-1 flex-col items-center justify-center p-12">
      <View className="flex-1 w-full items-center justify-center">
        <View className="items-center gap-2">
          <Image
            source={require("@/assets/logo/rise-logo.png")}
            className="w-[80px] max-h-[100px]"
          />
          <Text className="">
            Welcome to <Text className="font-bold">FUSE</Text>
          </Text>
        </View>
        <View className="flex-row items-center gap-2 py-8">
          <Pressable
            className="bg-gray-200 p-3 rounded-lg opacity-25"
            disabled
            onPress={() => {
              console.log("[LOG]: Google Login");
            }}
          >
            <Image
              source={require("@/assets/logo/social/google.png")}
              className="w-8 h-8"
            />
          </Pressable>
          <Pressable
            className="bg-gray-200 p-3 rounded-lg opacity-25"
            disabled
            onPress={() => {
              console.log("[LOG]: X Login");
            }}
          >
            <Image
              source={require("@/assets/logo/social/twitterX.png")}
              className="w-8 h-8"
            />
          </Pressable>
        </View>
        <Separator content="OR via Passkey" />
        <View className="items-center w-full py-8 gap-2">
          {/* TODO: Clean this design up */}
          <Pressable
            className="bg-gray-200 p-3 rounded-lg  w-full items-center"
            onPress={() => {
              connect({ connector: connectors[0], createAccount: true });
            }}
          >
            <Text>Register</Text>
          </Pressable>
          <Pressable
            className="bg-gray-200 p-3 rounded-lg  w-full items-center"
            onPress={() => {
              connect({ connector: connectors[0], createAccount: false });
            }}
          >
            <Text>Login</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-row gap-4 justify-end items-end flex-1 py-4">
        <Link href="/" target="_blank" asChild className="underline">
          <Text className="">Telegram</Text>
        </Link>
        <Link href="/" target="_blank" asChild className="underline">
          <Text className="">Discord</Text>
        </Link>
        <Link href="/" target="_blank" asChild className="underline">
          <Text className="">X</Text>
        </Link>
      </View>
    </View>
  );
}
