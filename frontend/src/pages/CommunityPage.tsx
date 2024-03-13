import { useEffect, useState } from "react";
import PostFeed from "../components/PostFeed";
import { Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function CommunityPage() {
  const [posts, setPosts] = useState([]);

  const { name } = useParams();

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
        `${baseURL}/api/post/list/${name}`,
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
    <>
      <PostFeed posts={posts} />
    </>
  );
}

export default CommunityPage;
