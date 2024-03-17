import { Box, Stack } from "@mui/material";
import PostCard from "./postcard/PostCard";
import { PostProps } from "../../interfaces/postProps";
import Line from "../../utils/Line";
import { useContext } from "react";
import {
  WindowSizeContext,
  WindowSizeProps,
} from "../../contexts/WindowSizeContext";

interface PostFeedProps {
  posts: PostProps[];
  handleClick: () => void;
}

function PostFeed({ posts, handleClick }: PostFeedProps) {
  let { screenWidth } = useContext(WindowSizeContext) as WindowSizeProps;

  return (
    <Stack
      direction="column"
      spacing={screenWidth < 576 ? "2px" : "8px"}
      divider={<Line />}
      className="xs:p-1 max-w-3xl"
    >
      <Sortbar size={screenWidth} />
      {posts.map((post: PostProps) => (
        <PostCard key={post.id} post={post} handleClick={handleClick} />
      ))}
      <Box className="text-center text-white opacity-25 text-2xl py-8">
        No more posts...
      </Box>
    </Stack>
  );
}

export default PostFeed;

interface SortbarProps {
  size: number;
}

function Sortbar({ size }: SortbarProps) {
  return size < 660 ? (
    <Box className="flex justify-center gap-2 text-white ">
      <p className="opacity-50 px-2 flex items-center text-center">SORT BY:</p>
      <SortbarItem icon="🔥" text="TRENDING" />
    </Box>
  ) : (
    <Box className="text-white flex justify-center py-2">
      <SortbarItem icon="🔥" text="TRENDING" />
      <SortbarItem icon="🕒" text="NEWEST" />
      <SortbarItem icon="🚀" text="TOP" />
      <SortbarItem icon="🚩" text="CONTROVERSIAL" />
    </Box>
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
