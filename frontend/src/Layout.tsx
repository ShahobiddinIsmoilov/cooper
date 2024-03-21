import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import Navbar from "./components/navbar/Navbar";
import { useDialog } from "./contexts/DialogContext";

function Layout() {
  const portal = document.getElementById("portal");
  const { isDialogVisible, dialogContent } = useDialog();

  return (
    <>
      <nav className="sticky top-0 z-10">
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/community/:name" element={<CommunityPage />} />
        <Route path="/community/:name/post/:id" element={<PostDetailPage />} />
      </Routes>
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
    </>
  );
}

export default Layout;
