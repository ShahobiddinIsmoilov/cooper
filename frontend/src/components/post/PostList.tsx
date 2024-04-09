import { Stack } from "@mantine/core";
import PostCard from "./postcard/PostCard";
import { PostProps } from "../../interfaces/postProps";
import Line from "../../utils/Line";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../../services/post/getPosts";
import { useAuthContext } from "../../contexts/AuthContext";

interface Props {
  filter: "home" | "explore" | "all" | "community";
  sortOption: string;
  community?: number;
}

export default function PostList({ filter, sortOption, community }: Props) {
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: community
      ? [`posts-community-${community}`]
      : [`posts-${filter}`],
    queryFn: () =>
      getPosts({
        filter: filter,
        sortOption: sortOption,
        community: community,
        user: user,
      }),
  });

  if (isPending) return "Loading...";

  if (error) return "Error";

  const posts = data.data;

  let notCommunity = false;
  if (filter === "home" || filter == "explore" || filter == "all")
    notCommunity = true;

  return (
    <Stack gap={0} className="max-w-3xl">
      <div className="mt-2">
        <Line />
      </div>
      {posts.map((post: PostProps) => (
        <div key={post.id}>
          <PostCard post={post} notCommunity={notCommunity} />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
