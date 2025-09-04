import { Text } from "@/components/ui";
import { cn } from "@/utilities/global";
import { cva, VariantProps } from "class-variance-authority";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const buttonVariants = cva("rounded-md items-center", {
  variants: {
    variant: {
      default: "bg-button",
      secondary: "bg-button-secondary",
      accent: "text-accent",
      outline: "border border-border",
    },
    size: {
      default: "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type CustomButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    title?: string;
    titleClassName?: string;

    icon?: React.ReactNode;
  };

export function Button(props: Readonly<CustomButtonProps>) {
  const {
    children,
    className,
    variant,
    title,
    titleClassName,
    icon,
    disabled,
    ...custom
  } = props;

  return (
    <TouchableOpacity
      className={cn(
        disabled ? "opacity-25" : "",
        buttonVariants({ variant, className })
      )}
      {...custom}
    >
      {children || (
        <>
          {icon}
          {title && <Text className={titleClassName}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
}
