import { Route, Routes } from "react-router-dom";
import { AppShell, Container, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import Header from "./components/header/Header";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import AllPage from "./pages/AllPage";
import LostPage from "./pages/LostPage";

export default function Layout() {
  const [opened] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 320,
          breakpoint: "lg",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Flex justify={{ xs: "flex-center" }}>
            <Container className="xs:px-2 w-[1056px] max-w-[1056px]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/all" element={<AllPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route
                  path="/community/:community_link"
                  element={<CommunityPage />}
                />
                <Route
                  path="/community/:community_link/post/:post_id"
                  element={<PostDetailPage />}
                />
                <Route path="/user/:username/*" element={<UserPage />} />
                <Route path="/profile/*" element={<ProfilePage />} />
                <Route path="*" element={<LostPage />} />
              </Routes>
            </Container>
          </Flex>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
