import { Text } from "@/components/ui";

import type { ClobToken } from "@/constants/Clob";
import { ChevronDown } from "lucide-react-native";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";

type TokenProps = {
  token: ClobToken;
  open: boolean;
  setOpen: (value: boolean) => void;
  selectToken: (token: ClobToken) => void;
  availableTokens: ClobToken[];
};

export default function TokenSelection(props: Readonly<TokenProps>) {
  const { token, open, setOpen, selectToken, availableTokens } = props;

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
          {availableTokens.map((token) => {
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
