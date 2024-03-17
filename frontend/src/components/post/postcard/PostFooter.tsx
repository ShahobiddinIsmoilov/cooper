import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostHeaderProps } from "./PostHeader";
import { useContext } from "react";
import {
  WindowSizeContext,
  WindowSizeProps,
} from "../../../contexts/WindowSizeContext";
import { BiDislike, BiLike } from "react-icons/bi";

function PostFooter({ post }: PostHeaderProps) {
  let { screenWidth } = useContext(WindowSizeContext) as WindowSizeProps;

  return (
    <Box className="flex justify-between xs:pr-3 pt-2 xs:pb-1">
      <Box className="xs:px-5 flex items-center justify-space gap-1 xs:gap-4">
        <span
          className="flex items-center gap-1 bg-dark-900
                    xs:bg-transparent rounded-full"
        >
          <Box
            className="p-2 rounded-full cursor-pointer hover:bg-dark-600
                       text-yellow-400 hover:text-green-400"
          >
            <BiLike className="text-2xl" />
          </Box>
          <span
            className={
              post.votes > 0
                ? "text-green-400 xs:text-lg font-bold"
                : "text-red-400 xs:text-lg font-bold"
            }
          >
            {post.votes > 0 ? "+" + post.votes.toLocaleString() : post.votes}
          </span>
          <Box
            className="p-2 rounded-full cursor-pointer hover:bg-dark-600
                      text-yellow-400 hover:text-red-400"
          >
            <BiDislike className="text-2xl" />
          </Box>
        </span>
        <Link to={`/community/${post.community}/post/${post.id}`}>
          <span
            className="xs:text-lg font-bold text-cyan-400 rounded-full
                      hover:bg-dark-600 px-4 py-2 bg-dark-800
                      xs:bg-transparent"
          >
            💬{" "}
            {screenWidth < 576
              ? post.comments.toLocaleString()
              : post.comments.toLocaleString() + " comments"}
          </span>
        </Link>
      </Box>
      <span
        className="text-xl opacity-50 hover:bg-dark-600 px-3 py-2
                    rounded-full hover:opacity-100 cursor-pointer"
      >
        ∙∙∙
      </span>
    </Box>
  );
}

export default PostFooter;
