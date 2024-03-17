import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Infobar from "./components/Infobar";

function Layout() {
  return (
    <div>
      <Box className="sticky top-0 z-10">
        <Navbar />
      </Box>
      <Box className="flex justify-center max-w-full">
        <Box className="xs:px-2">
          <Sidebar />
        </Box>
        <Box className="flex-grow max-w-3xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/community/:name" element={<CommunityPage />} />
            <Route
              path="/community/:name/post/:id"
              element={<PostDetailPage />}
            />
          </Routes>
        </Box>
        <Box className="xs:px-2 m-0">
          <Infobar />
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
