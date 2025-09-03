import { cn } from "@/utilities/global";
import { Text as RNText, TextProps } from "react-native";

export default function Text(props: Readonly<TextProps>) {
  const { children, className, ...custom } = props;

  return (
    <RNText className={cn("text-primary", className)} {...custom}>
      {children}
    </RNText>
  );
}
