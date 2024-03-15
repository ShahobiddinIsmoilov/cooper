import { useEffect, useState } from "react";
import CommentFeed from "./CommentFeed";
import axios from "axios";

function CommentList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function getComments() {
    try {
      const response = await axios.get(
        `${baseURL}/api/comment/list/all/`,
        options
      );
      console.log(response.data);
      if (response.status === 200) {
        setComments(response.data);
        console.log(response.data);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return <CommentFeed comments={comments} />;
}

export default CommentList;
