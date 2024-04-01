import { Group, Select, Stack } from "@mantine/core";
import { PostProps } from "../../interfaces/postProps";
import Line from "../../utils/Line";
import PostCard from "../post/postcard/PostCard";
import { useQueryClient } from "@tanstack/react-query";

interface PostFeedProps {
  posts: PostProps[];
  sortOption: string;
  setSortOption: (value: string) => void;
}

export default function UserPostList({
  posts,
  sortOption,
  setSortOption,
}: PostFeedProps) {
  const query = useQueryClient();

  return (
    <Stack gap={0} className="xs:p-1 flex-grow max-w-3xl">
      <Group className="p-2 pb-3">
        <span>SORT BY:</span>
        <Select
          w={100}
          data={["NEW", "TOP"]}
          value={sortOption}
          onOptionSubmit={(value) => {
            query.removeQueries({ queryKey: ["user-posts"] });
            setSortOption(value);
            console.log(value);
          }}
        />
      </Group>
      <Line />
      {posts.map((post: PostProps) => (
        <div key={post.id}>
          <PostCard post={post} />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
