import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetail from "./pages/PostDetail";
import CommunityPage from "./pages/CommunityPage";
import AuthProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import "./index.css";
import { AppBar, CssBaseline } from "@mui/material";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <CssBaseline />
          <AppBar position="sticky">
            <Navbar />
          </AppBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/community/:name" element={<CommunityPage />} />
            <Route path="/community/post/:id" element={<PostDetail />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
