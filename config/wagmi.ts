import { asyncStorage } from "@/utilities/storage";
import { Mode } from "porto";
import { porto } from "porto/wagmi";
import * as passkeys from "react-native-passkeys";
import { riseTestnetConfig } from "rise-wallet";
import { ByteArray, bytesToHex } from "viem";
import { baseSepolia } from "viem/chains";
import { createConfig, http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  storage: asyncStorage,
  multiInjectedProviderDiscovery: false,
  connectors: [
    porto({
      ...riseTestnetConfig,
      mode: Mode.relay({
        keystoreHost: "asset-pepper24bots-projects.vercel.app",
        webAuthn: {
          createFn: async (opts) => {
            console.log("create-opts:: ", opts);
            if (!opts?.publicKey) return null;

            try {
              const optsNew = {
                ...opts.publicKey,
                challenge: btoa(
                  bytesToHex(opts.publicKey.challenge as ByteArray)
                ),
                // challenge: bufferToBase64URLString(
                //   opts.publicKey.challenge as ArrayBuffer
                // ),
                user: {
                  ...opts.publicKey.user,
                  id: btoa(bytesToHex(opts.publicKey.user.id as ByteArray)),
                  // id: bufferToBase64URLString(
                  //   opts.publicKey.user.id as ArrayBuffer
                  // ),
                },
              } as const;

              console.log("credentials:: ", optsNew);
              const res = await passkeys.create({ ...optsNew });
              console.log("response:: ", res);

              const publicKeyBuffer = res?.response.getPublicKey();
              console.log("publicKeyBuffer :: ", publicKeyBuffer);

              return res;
            } catch (e) {
              console.log("error:: ", e);
              return null;
            }
          },
          getFn: async (opts) => {
            console.log("get-opts:: ", opts);

            if (!opts?.publicKey) return null;
            return await passkeys.get({
              ...opts.publicKey,
              challenge: btoa(
                bytesToHex(opts.publicKey.challenge as ByteArray)
              ),
            });
          },
        },
      }),
    }),
  ],
});
