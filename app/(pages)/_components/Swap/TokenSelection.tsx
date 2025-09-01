import { SUPPORTED_TOKENS } from "@/constants/Tokens";
import { SupportedToken } from "@/types/faucet";
import { ChevronDown } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import Modal from "react-native-modal";

type TokenProps = {
  token: Partial<SupportedToken>;
  open: boolean;
  setOpen: (value: boolean) => void;
  selectToken: (token: Partial<SupportedToken>) => void;
};

export function TokenSelection(props: Readonly<TokenProps>) {
  const { token, open, setOpen, selectToken } = props;

  return (
    <View className="">
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row gap-1 justify-between items-center"
      >
        <Text className="font-bold text-2xl">{token.symbol}</Text>
        <ChevronDown strokeWidth="1px" />
      </Pressable>
      <Modal
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        backdropColor=""
        className="justify-end ml-0 mb-0 h-full w-full absolute bottom-0 left-0 max-h-80"
      >
        <View className="bg-white p-4 h-full w-full gap-2">
          {SUPPORTED_TOKENS.filter((token) => {
            return token.isSupported;
          }).map((token) => {
            return (
              <View key={token.name} className="p-3 bg-gray-200 rounded-md">
                <Pressable
                  onPress={() => {
                    selectToken(token);
                    setOpen(false);
                  }}
                >
                  <Text className="text-xl">
                    {token.name} (
                    <Text className="font-bold">{token.symbol}</Text>)
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}
