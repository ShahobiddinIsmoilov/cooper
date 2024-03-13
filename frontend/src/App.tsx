import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetail from "./pages/PostDetail";
import CommunityPage from "./pages/CommunityPage";
import AuthProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Infobar from "./components/Infobar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <CssBaseline />
          <Box className="sticky top-0 z-10">
            <Navbar />
          </Box>
          <Box className="flex justify-center">
            <Box className="xs:p-2 sticky top-0">
              <Sidebar />
            </Box>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/community/:name" element={<CommunityPage />} />
              <Route path="/community/post/:id" element={<PostDetail />} />
            </Routes>
            <Box className="xs:p-2 sticky top-0">
              <Infobar />
            </Box>
          </Box>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
