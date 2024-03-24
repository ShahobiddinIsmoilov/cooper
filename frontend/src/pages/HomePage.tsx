import { useQuery } from "@tanstack/react-query";
import PostFeed from "../components/post/PostFeed";
import getPosts from "../services/post/getPosts";

function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["homepage-posts"],
    queryFn: () => getPosts(),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return <PostFeed posts={posts} home={true} />;
}

export default HomePage;
