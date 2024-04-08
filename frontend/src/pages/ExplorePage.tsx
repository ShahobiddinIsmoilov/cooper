import PostFeed from "../components/post/PostFeed";
import { useAuthContext } from "../contexts/AuthContext";

export default function ExplorePage() {
  const user = useAuthContext().user;
  return user ? (
    <PostFeed filter="explore" user={user.user_id} />
  ) : (
    <PostFeed filter="all" />
  );
}
