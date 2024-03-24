import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import CommentProvider from "./contexts/CommentContext";
import DialogProvider from "./contexts/DialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider>
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

export default App;
