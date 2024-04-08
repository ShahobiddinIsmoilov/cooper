import { useLocation, useNavigate } from "react-router-dom";
import PostFeed from "../components/post/PostFeed";
import { useAuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  if (!path.includes("home")) navigate("/home");

  const user = useAuthContext().user;
  return user ? (
    <PostFeed filter="home" user={user.user_id} />
  ) : (
    <PostFeed filter="all" />
  );
}
