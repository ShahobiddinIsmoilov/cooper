import { useEffect, useState } from "react";
import PostFeed from "../components/post/PostFeed";
import axios from "axios";
import { useParams } from "react-router-dom";

function CommunityPage() {
  const [posts, setPosts] = useState([]);

  const { name } = useParams();

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
    sessionStorage.setItem("scrollPosition", String(window.scrollY));
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
        `${baseURL}/api/post/list/${name}`,
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
    <>
      <PostFeed posts={posts} handleClick={handleClick} />
    </>
  );
}

export default CommunityPage;
