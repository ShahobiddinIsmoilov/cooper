import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import PostFeed from "../components/PostFeed";

export interface PostProps {
  user_id: number;
  username: string;
  id: number;
  title: string;
  body: string;
  community: string;
  comments: number;
  votes: number;
  url: string;
  created_at: string;
}

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

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
      console.log(response.data);
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      return (
        <>
          <Typography variant="h3">Couldn't load data</Typography>
        </>
      );
    }
  }

  return (
    <Box className="flex items-center">
      <PostFeed posts={posts} all={true} />
    </Box>
  );
}

export default HomePage;
