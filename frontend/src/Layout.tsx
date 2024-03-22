import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import Navbar from "./components/navbar/Navbar";
import { useDialog } from "./contexts/DialogContext";
import { useWindowSize } from "./contexts/WindowSizeContext";
import Sidebar from "./components/Sidebar";
import Infobar from "./components/Infobar";

function Layout() {
  const portal = document.getElementById("portal");
  const { isDialogVisible, dialogContent } = useDialog();
  const { screenWidth } = useWindowSize();

  return (
    <div>
      <nav className="sticky top-0 z-10" id="navbar">
        <Navbar />
      </nav>
      <div className="flex justify-center" id="container">
        {screenWidth >= 1200 && <Sidebar />}
        <div className="flex-grow max-w-3xl xs:px-2" id="feed">
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
        </div>
        {screenWidth >= 920 && <Infobar />}
      </div>
      {isDialogVisible &&
        createPortal(
          <div
            className="bg-white fixed top-0 left-0 w-full h-full
                        flex justify-center items-center z-20 bg-opacity-25"
          >
            {dialogContent}
          </div>,
          portal!
        )}
    </div>
  );
}

export default Layout;
