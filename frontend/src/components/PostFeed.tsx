import { Box, Stack } from "@mui/material";
import PostCard from "./PostCard";
import { PostProps } from "../pages/HomePage";
import Line from "./Line";
import { useEffect, useState } from "react";

interface PostFeedProps {
  posts: PostProps[];
  all?: boolean;
}

function PostFeed({ posts }: PostFeedProps) {
  const [isScreenXS, setIsScreenXS] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenXS(window.innerWidth < 660);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScreenXS]);

  return (
    <Stack
      direction="column"
      spacing="8px"
      divider={<Line />}
      className="xs:p-1"
    >
      <Sortbar xs={isScreenXS} />
      {posts.map((post: PostProps) => (
        <PostCard key={post.id} post={post} xs={isScreenXS} />
      ))}
      <Box className="text-center text-white opacity-25 text-2xl py-8">
        No more posts...
      </Box>
    </Stack>
  );
}

export default PostFeed;

interface SortbarProps {
  xs: boolean;
}

function Sortbar({ xs }: SortbarProps) {
  return xs ? (
    <Box className="flex justify-end gap-2 text-white ">
      <p className="opacity-50 px-2 flex items-center text-center">SORT BY:</p>
      <SortbarItem icon="🔥" text="TRENDING" />
    </Box>
  ) : (
    <Box className="text-white flex justify-center pb-2">
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
      className="hover:bg-gray-600 cursor-pointer text-lg text-orange-400
                rounded-full py-2 px-4"
    >
      {icon + " " + text}
    </p>
  );
}
