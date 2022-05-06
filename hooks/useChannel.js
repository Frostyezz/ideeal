import Ably from "ably/promises";
import { useEffect } from "react";

const authUrl = !process.env.NEXT_PUBLIC_VERCEL_URL
  ? "http://localhost:3000/api/createTokenRequest"
  : `https://${process.env.VERCEL_URL}/api/createTokenRequest`;

const ably = new Ably.Realtime.Promise({
  authUrl,
});

export function useChannel(channelName, callbackOnMessage) {
  if (channelName) {
    const channel = ably.channels.get(channelName);

    const onMount = () => {
      channel.subscribe((msg) => {
        callbackOnMessage(msg);
      });
    };

    const onUnmount = () => {
      channel.unsubscribe();
    };

    const useEffectHook = () => {
      onMount();
      return () => {
        onUnmount();
      };
    };

    useEffect(useEffectHook);
    return [channel, ably];
  }
  return [null, null];
}
