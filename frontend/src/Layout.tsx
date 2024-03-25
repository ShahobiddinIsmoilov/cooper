import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import Header from "./components/header/Header";
import Navbar from "./components/Navbar";
import { AppShell, Container, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Layout() {
  const [opened] = useDisclosure();
  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 320,
        breakpoint: "lg",
        collapsed: { mobile: !opened },
      }}
      withBorder={false}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Flex justify={{ xs: "center" }}>
          <Container className="xs:px-2 max-w-[1056px]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route
                path="/community/:community_name"
                element={<CommunityPage />}
              />
              <Route
                path="/community/:community_name/post/:post_id"
                element={<PostDetailPage />}
              />
            </Routes>
          </Container>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
