import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskContextProvider } from "../context/TaskContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { contextProps, session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <TaskContextProvider {...contextProps}>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </TaskContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
