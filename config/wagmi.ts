import { asyncStorage } from "@/utilities/storage";
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
} from "@simplewebauthn/browser";
import { Mode } from "porto";
import { porto } from "porto/wagmi";
import * as passkeys from "react-native-passkeys";
import { riseTestnet } from "rise-wallet";
import { http } from "viem";
import { createConfig } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [riseTestnet],
  transports: {
    [riseTestnet.id]: http(),
  },
  storage: asyncStorage,
  multiInjectedProviderDiscovery: false,
  connectors: [
    porto({
      relay: http("https://rise-testnet-porto.fly.dev"),
      mode: Mode.relay({
        keystoreHost: "asset-pepper24bots-projects.vercel.app",
        webAuthn: {
          createFn: async (opts) => {
            if (!opts?.publicKey) return null;

            const res = await passkeys.create({
              ...opts.publicKey,
              challenge: bufferToBase64URLString(
                opts.publicKey.challenge as ArrayBuffer
              ),
              user: {
                ...opts.publicKey.user,
                id: bufferToBase64URLString(
                  opts.publicKey.user.id as ArrayBuffer
                ),
              },
              excludeCredentials: opts.publicKey.excludeCredentials?.map(
                (cred) => ({
                  ...cred,
                  id: bufferToBase64URLString(cred.id as ArrayBuffer),
                })
              ),
            });

            if (!res) return res;

            const cred: Omit<
              PublicKeyCredential,
              "getClientExtensionResults" | "toJSON" | "response"
            > & {
              response: Omit<AuthenticatorAttestationResponse, `get${string}`>;
            } = {
              ...res,
              authenticatorAttachment: res.authenticatorAttachment ?? null,
              rawId: base64URLStringToBuffer(res.rawId),
              response: {
                ...res.response,
                attestationObject: base64URLStringToBuffer(
                  res.response.attestationObject
                ),
                clientDataJSON: Uint8Array.from(
                  atob(res.response.clientDataJSON),
                  (char) => char.charCodeAt(0)
                ).buffer,
              },
            };

            return cred;
          },
          getFn: async (opts) => {
            if (!opts?.publicKey) return null;

            const res = await passkeys.get({
              ...opts.publicKey,
              allowCredentials: opts.publicKey.allowCredentials?.map(
                (cred) => ({
                  ...cred,
                  id: bufferToBase64URLString(cred.id as ArrayBuffer),
                })
              ),
              challenge: bufferToBase64URLString(
                opts.publicKey.challenge as ArrayBuffer
              ),
            });

            if (!res) return res;

            const cred: Omit<
              PublicKeyCredential,
              "getClientExtensionResults" | "toJSON" | "response"
            > & {
              response: AuthenticatorAssertionResponse;
            } = {
              ...res,
              authenticatorAttachment: res.authenticatorAttachment ?? null,
              rawId: base64URLStringToBuffer(res.rawId),
              response: {
                ...res.response,
                clientDataJSON: Uint8Array.from(
                  atob(res.response.clientDataJSON),
                  (char) => char.charCodeAt(0)
                ).buffer,
                signature: base64URLStringToBuffer(res.response.signature),
                authenticatorData: base64URLStringToBuffer(
                  res.response.authenticatorData
                ),
                userHandle: res.response.userHandle
                  ? base64URLStringToBuffer(res.response.userHandle)
                  : null,
              },
            };

            return cred;
          },
        },
      }),
    }),
  ],
});
