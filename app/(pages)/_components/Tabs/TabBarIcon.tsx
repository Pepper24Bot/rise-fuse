import {
  ChartLine,
  ChartNoAxesCombined,
  History,
  House,
  Wallet,
} from "lucide-react-native";

type TabBarIconProps = {
  name: string;
};

export default function TabBarIcon(props: Readonly<TabBarIconProps>) {
  const { name } = props;

  switch (name) {
    case "Market":
      return <ChartNoAxesCombined />;
    case "Asset":
      return <Wallet />;
    case "Trade":
      return <ChartLine />;
    case "History":
      return <History />;
    case "Home":
    default:
      return <House />;
  }
}
