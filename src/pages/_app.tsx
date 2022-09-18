import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TaskContextProvider } from "../context/TaskContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { contextProps, session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <TaskContextProvider {...contextProps}>
          <Component {...pageProps} />
      </TaskContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
