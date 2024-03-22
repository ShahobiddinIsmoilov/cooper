import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import CommentProvider from "./contexts/CommentContext";
import { CssBaseline } from "@mui/material";
import DialogProvider from "./contexts/DialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WindowSizeProvider>
        <DialogProvider>
          <AuthProvider>
            <BrowserRouter>
              <CommentProvider>
                <CssBaseline />
                <Layout />
                <div id="portal" />
              </CommentProvider>
            </BrowserRouter>
          </AuthProvider>
        </DialogProvider>
      </WindowSizeProvider>
    </QueryClientProvider>
  );
}

export default App;
