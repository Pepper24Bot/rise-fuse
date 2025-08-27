import "@/utilities/polyfills";

import { wagmiConfig } from "@/config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { WagmiProvider } from "wagmi";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={client}>
        <Stack />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
