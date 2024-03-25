import "@mantine/core/styles.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import CommentProvider from "./contexts/CommentContext";
import DialogProvider from "./contexts/DialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WindowSizeProvider>
          <DialogProvider>
            <AuthProvider>
              <BrowserRouter>
                <CommentProvider>
                  <Layout />
                  <div id="portal" />
                </CommentProvider>
              </BrowserRouter>
            </AuthProvider>
          </DialogProvider>
        </WindowSizeProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
