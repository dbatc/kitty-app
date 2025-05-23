import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { Auth0Provider } from "@auth0/nextjs-auth0";

import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Auth0Provider>
      <HeroUIProvider>
        <Component {...pageProps} />
      </HeroUIProvider>
    </Auth0Provider>
  );
}
