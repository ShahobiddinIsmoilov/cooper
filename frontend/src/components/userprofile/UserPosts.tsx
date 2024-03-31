import { useQuery } from "@tanstack/react-query";
import getPosts from "../../services/post/getPosts";
import UserPostList from "./UserPostList";

export default function UserPosts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () => getPosts(),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return <UserPostList posts={posts} />;
}
