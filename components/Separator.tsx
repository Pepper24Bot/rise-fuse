import { Text, View } from "react-native";

export type Props = {
  content?: string;
  orientation?: "vertical" | "horizontal";

  // add props as needed such as position, classname
};

export default function Separator(props: Props) {
  const { content, orientation = "horizontal" } = props;

  if (content) {
    // TODO: Fix this: w-[40%]
    return (
      <View className="flex-row items-center gap-4">
        <View className="h-[1px] flex-1 bg-gray-300" />
        <Text>{content}</Text>
        <View className="h-[1px] flex-1 bg-gray-300" />
      </View>
    );
  }

  return <View className="h-[1px] flex-1 bg-gray-300" />;
}
