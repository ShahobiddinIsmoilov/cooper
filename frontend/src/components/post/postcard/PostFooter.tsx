import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostHeaderProps } from "./PostHeader";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";

import { useWindowSize } from "../../../contexts/WindowSizeContext";

function PostFooter({ post }: PostHeaderProps) {
  let { screenWidth } = useWindowSize();

  return (
    <Box className="flex justify-between xs:pr-3 pt-2 xs:pb-1">
      <Box className="xs:mx-5 flex items-center justify-space gap-1 xs:gap-4">
        <Box
          className="flex items-center gap-1 bg-dark-900
                    xs:bg-transparent rounded-full"
        >
          <Box
            className="p-2 rounded-full cursor-pointer hover:bg-dark-600
                       text-yellow-400 hover:text-green-400"
          >
            <BiLike className="text-xl xs:text-2xl" />
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
            <BiDislike className="text-xl xs:text-2xl" />
          </Box>
        </Box>
        <Link
          to={`/community/${post.community}/post/${post.id}`}
          reloadDocument
        >
          <Box
            className="py-1 px-3 rounded-full cursor-pointer flex justify-center
                      bg-dark-900 xs:bg-transparent items-center
                      hover:bg-dark-600 text-white gap-2"
          >
            <FaComment className="text-lg xs:text-xl" />
            <span className="xs:text-lg text-cyan-400 font-bold">
              {screenWidth < 576
                ? post?.comments.toLocaleString()
                : post?.comments.toLocaleString() + " comments"}
            </span>
          </Box>
        </Link>
      </Box>
      <Box
        className="text-xl opacity-50 hover:bg-dark-600 px-3 py-2
                    rounded-full hover:opacity-100 cursor-pointer"
      >
        ∙∙∙
      </Box>
    </Box>
  );
}

export default PostFooter;
