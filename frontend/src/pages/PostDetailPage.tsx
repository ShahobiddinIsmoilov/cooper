import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostDetail from "../components/post/PostDetail";
import { Box } from "@mui/material";
import Infobar from "../components/Infobar";
import Sidebar from "../components/Sidebar";

function PostDetailPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function getPost() {
    try {
      const response = await axios.get(`${baseURL}/api/post/${id}/`, options);
      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (error) {
      console.log("Error in PostDetailPage.tsx getPosts function");
    }
  }

  return (
    <Box className="flex justify-center">
      <Sidebar />
      <Box className="flex-grow max-w-3xl xs:px-2">
        <PostDetail post={post} />
      </Box>
      <Infobar />
    </Box>
  );
}

export default PostDetailPage;
