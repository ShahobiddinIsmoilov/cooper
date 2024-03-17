import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import PostFeed from "../components/post/PostFeed";

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
    <Box className="flex items-center">
      <PostFeed posts={posts} handleClick={handleClick} />
    </Box>
  );
}

export default HomePage;
