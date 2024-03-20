import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { PostProps } from "../../../interfaces/postProps";

export interface PostHeaderProps {
  post: PostProps;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <Box className="flex justify-between px-1 pt-1 xs:px-5 xs:py-2">
      <Box className="flex items-center gap-4">
        <img
          src={`../../../../src/assets/${post.community}.jpg`}
          alt="community profile picture"
          className="w-10 xs:w-14 h-10 xs:h-14 min-w-8 xs:min-w-10 object-cover rounded-full"
        />
        <Box className="text-xs xs:text-base">
          <Link to={`/community/${post.community}`}>
            <span className="font-bold hover:underline  text-blue-400">
              {post.community}
            </span>
            <span className="opacity-50"> ∙ 3h ago</span>
          </Link>
          <Box>
            <span className="opacity-50"> posted by </span>
            <Link to={`/user/${post.username}`}>
              <span className="font-bold hover:underline text-orange-400">
                {post.username}
              </span>
            </Link>
          </Box>
        </Box>
      </Box>
      <span
        className="cursor-pointer flex items-center opacity-50 pr-1
                  hover:opacity-100 xs:p-0"
      >
        🔗
      </span>
    </Box>
  );
}
