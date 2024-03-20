import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import PostFeed from "../components/post/PostFeed";
import Sidebar from "../components/Sidebar";
import Infobar from "../components/Infobar";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
    // handleScrollPosition();
  }, []);

  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  };

  const handleClick = () => {
    // sessionStorage.setItem("scrollPosition", String(window.scrollY));
  };

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function getPosts() {
    try {
      const response = await axios.get(
        `${baseURL}/api/post/list/all/`,
        options
      );
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <Box className="flex justify-center">
      <Sidebar />
      <Box className="flex-grow max-w-3xl xs:px-2">
        <PostFeed posts={posts} handleClick={handleClick} />
      </Box>
      <Infobar />
    </Box>
  );
}

export default HomePage;
