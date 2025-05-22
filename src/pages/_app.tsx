import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
      <Component {...pageProps} />

      </HeroUIProvider>
    </SessionProvider>
  )
}
