import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import PostCard from "../components/PostCard";

export interface PostProps {
  user_id: number;
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
      const response = await axios.get(`${baseURL}/api/post/list/`, options);
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
    <Box sx={{ alignItems: "center", p: "20px 100px" }}>
      <Stack direction="column" spacing="5px" divider={<Line />}>
        {posts.map((post: PostProps) => (
          <PostCard post={post} />
        ))}
      </Stack>
    </Box>
  );
}

function Line() {
  return <div className="h-px bg-gray-300"></div>;
}

// ▲▼

export default HomePage;
