import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import CommentProvider from "./contexts/CommentContext";
import { CssBaseline } from "@mui/material";
import DialogueProvider from "./contexts/DialogueContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WindowSizeProvider>
          <DialogueProvider>
            <CommentProvider>
              <CssBaseline />
              <Layout />
              <div id="portal" />
            </CommentProvider>
          </DialogueProvider>
        </WindowSizeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
