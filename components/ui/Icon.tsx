import { cn } from "@/utilities/global";
import { cva, VariantProps } from "class-variance-authority";
import { icons, LucideProps } from "lucide-react-native";
import { useColorScheme } from "react-native";

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      secondary: "",
      accent: "",
    },
  },
  defaultVariants: {
    variant: "default",
    // size: "default",
  },
});

const colorVariants = {
  light: {
    default: "#1e2024",
    accent: "#6d5ad5",
    secondary: "#61646b",
  },
  dark: {
    default: "#edeeef",
    accent: "#7967e5",
    secondary: "#b2b4b9",
  },
};

export type CustomIconProps = LucideProps &
  VariantProps<typeof iconVariants> & {
    name: keyof typeof icons;
    colorVariant?: keyof typeof colorVariants.light;
    color?: string;
  };

export function Icon(props: Readonly<CustomIconProps>) {
  const { name, variant, className, color, colorVariant, ...custom } = props;
  const colorScheme = useColorScheme() ?? "light";

  // eslint-disable-next-line import/namespace
  const IconComponent = icons[name] as React.ComponentType<LucideProps>;

  if (!IconComponent) {
    console.warn(`Lucide icon "${name}" not found`);
    return null;
  }

  const getColor = () => {
    if (color) return color;
    if (colorVariant) return colorVariants[colorScheme][colorVariant];
    return colorVariants[colorScheme].default;
  };

  return (
    <IconComponent
      {...custom}
      color={getColor()}
      className={cn(iconVariants({ variant, className }))}
    />
  );
}
