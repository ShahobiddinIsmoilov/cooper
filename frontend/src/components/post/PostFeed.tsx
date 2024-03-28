import { Stack } from "@mantine/core";

import PostCard from "./postcard/PostCard";
import { PostProps } from "../../interfaces/postProps";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import Line from "../../utils/Line";

interface PostFeedProps {
  posts: PostProps[];
  home?: boolean;
}

function PostFeed({ posts, home }: PostFeedProps) {
  let { screenWidth } = useWindowSize();

  return (
    <Stack gap={0} className="xs:p-1 max-w-3xl">
      <Sortbar size={screenWidth} />
      {posts.map((post: PostProps) => (
        <div key={post.id}>
          <PostCard post={post} home={home} />
          <Line />
        </div>
      ))}
      <div className="text-center text-white opacity-25 text-2xl py-8">
        No more posts...
      </div>
    </Stack>
  );
}

export default PostFeed;

interface SortbarProps {
  size: number;
}

function Sortbar({ size }: SortbarProps) {
  return size < 620 ? (
    <div className="flex justify-center gap-2 text-white">
      <p className="opacity-50 px-2 flex items-center text-center">SORT BY:</p>
      <SortbarItem icon="🔥" text="TRENDING" />
    </div>
  ) : (
    <div className="text-white flex justify-center py-2">
      <SortbarItem icon="🔥" text="HOT" />
      <SortbarItem icon="🕒" text="NEWEST" />
      <SortbarItem icon="🚀" text="TOP" />
      <SortbarItem icon="🚩" text="CONTROVERSIAL" />
    </div>
  );
}

interface SortbarItemProps {
  icon: string;
  text?: string;
}

function SortbarItem({ icon, text }: SortbarItemProps) {
  return (
    <p
      className="hover:bg-dark-700 cursor-pointer text-lg text-orange-400
                rounded-full py-2 px-4"
    >
      {icon + " " + text}
    </p>
  );
}
