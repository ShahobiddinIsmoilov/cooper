import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import Navbar from "./components/Navbar";
import { useDialogue } from "./contexts/DialogueContext";

function Layout() {
  const portal = document.getElementById("portal");
  const { isDialogueVisible, dialogueContent } = useDialogue();

  return (
    <>
      <Box className="sticky top-0 z-10">
        <Navbar />
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/community/:name" element={<CommunityPage />} />
        <Route path="/community/:name/post/:id" element={<PostDetailPage />} />
      </Routes>
      {isDialogueVisible &&
        createPortal(
          <Box
            className="bg-dark-900 fixed top-0 left-0 w-full h-full
                        flex justify-center items-center z-20 bg-opacity-50"
          >
            {dialogueContent}
          </Box>,
          portal!
        )}
    </>
  );
}

export default Layout;
