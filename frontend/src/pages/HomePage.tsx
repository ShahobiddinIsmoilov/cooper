import { useLocation, useNavigate } from "react-router-dom";
import PostFeed from "../components/post/PostFeed";
import { useAuthContext } from "../contexts/AuthContext";
import { useLayoutEffect } from "react";

export default function HomePage() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!path.includes("home")) navigate("/home");
  });

  const user = useAuthContext().user;
  return user ? <PostFeed filter="home" /> : <PostFeed filter="all" />;
}
