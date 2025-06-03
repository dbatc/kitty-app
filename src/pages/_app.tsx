import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Auth0Provider>
      <ApolloProvider client={client}>
        <HeroUIProvider>
          <Component {...pageProps} />
        </HeroUIProvider>
      </ApolloProvider>
    </Auth0Provider>
  );
}
