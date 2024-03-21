import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import CommentProvider from "./contexts/CommentContext";
import { CssBaseline } from "@mui/material";
import DialogProvider from "./contexts/DialogContext";

function App() {
  return (
    <WindowSizeProvider>
      <DialogProvider>
        <BrowserRouter>
          <AuthProvider>
            <CommentProvider>
              <CssBaseline />
              <Layout />
              <div id="portal" />
            </CommentProvider>
          </AuthProvider>
        </BrowserRouter>
      </DialogProvider>
    </WindowSizeProvider>
  );
}

export default App;
