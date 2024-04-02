import { Stack } from "@mantine/core";
import PostCard from "./postcard/PostCard";
import { PostProps } from "../../interfaces/postProps";
import Line from "../../utils/Line";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../../services/post/getPosts";

interface PostFeedProps {
  page: number | "home" | "explore";
  sortOption: string;
}

export default function PostList({ page, sortOption }: PostFeedProps) {
  const { isPending, error, data } = useQuery({
    queryKey: [`posts-${page}`],
    queryFn: () => getPosts({ page: page, sortOption: sortOption }),
  });

  if (isPending) return "Loading...";

  if (error) return "Error";

  const posts = data.data;

  let notCommunity = false;
  if (page === "home" || page == "explore") notCommunity = true;

  return (
    <Stack gap={0} className="xs:p-1 max-w-3xl">
      <div className="mt-2">
        <Line />
      </div>
      {posts.map((post: PostProps) => (
        <div key={post.id}>
          <PostCard post={post} notCommunity={notCommunity} />
          <Line />
        </div>
      ))}
      <div className="text-center text-white opacity-25 text-2xl py-8">
        No more posts...
      </div>
    </Stack>
  );
}
