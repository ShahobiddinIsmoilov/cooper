import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import CommentProvider from "./contexts/CommentContext";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WindowSizeProvider>
          <CommentProvider>
            <CssBaseline />
            <Layout />
          </CommentProvider>
        </WindowSizeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
