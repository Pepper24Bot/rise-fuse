import { cn } from "@/utilities/global";
import { cva, VariantProps } from "class-variance-authority";
import { Text as RNText, TextProps } from "react-native";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      error: "text-red-600",
      success: "text-green-600",
      warning: "text-yellow-600",
      secondary: "",
      accent: "text-accent",
    },
    size: {
      default: "text-base",
      heading: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type CustomTextProps = TextProps & VariantProps<typeof textVariants>;

export function Text(props: Readonly<CustomTextProps>) {
  const { children, className, size, variant, ...custom } = props;

  return (
    <RNText
      className={cn(textVariants({ variant, size, className }))}
      {...custom}
    >
      {children}
    </RNText>
  );
}
