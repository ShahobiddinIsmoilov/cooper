import { Stack } from "@mantine/core";
import { PostProps } from "../../interfaces/postProps";
import Line from "../../utils/Line";
import PostCard from "../post/postcard/PostCard";

interface PostFeedProps {
  posts: PostProps[];
}

export default function UserPostList({ posts }: PostFeedProps) {
  return (
    <Stack gap={0} className="xs:p-1 min-w-3xl max-w-3xl">
      {posts.map((post: PostProps) => (
        <div key={post.id}>
          <PostCard post={post} home={true} />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
