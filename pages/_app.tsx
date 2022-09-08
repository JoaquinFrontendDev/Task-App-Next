import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {TaskContextProvider} from "../context/TaskContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskContextProvider>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </TaskContextProvider>
  );
}

export default MyApp;
