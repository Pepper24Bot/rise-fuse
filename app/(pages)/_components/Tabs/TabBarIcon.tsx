import Asset from "@/assets/icons/tabs/asset.svg";
import History from "@/assets/icons/tabs/history.svg";
import Home from "@/assets/icons/tabs/home.svg";
import Market from "@/assets/icons/tabs/market.svg";
import Trade from "@/assets/icons/tabs/trade.svg";

type TabBarIconProps = {
  name: string;
};

export default function TabBarIcon(props: Readonly<TabBarIconProps>) {
  const { name } = props;

  switch (name) {
    case "Market":
      return <Market />;
    case "Asset":
      return <Asset />;
    case "Trade":
      return <Trade />;
    case "History":
      return <History />;
    case "Home":
    default:
      return <Home />;
  }
}
