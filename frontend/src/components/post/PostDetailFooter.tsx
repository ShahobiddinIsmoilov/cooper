import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import {
  WindowSizeContext,
  WindowSizeProps,
} from "../../contexts/WindowSizeContext";
import { PostProps } from "../../interfaces/postProps";

interface PostDetailFooterProps {
  post: PostProps | null;
}

function PostDetailFooter({ post }: PostDetailFooterProps) {
  let { screenWidth } = useContext(WindowSizeContext) as WindowSizeProps;

  return (
    <Box className="flex justify-between xs:pr-3 pt-2 xs:pb-2">
      <Box className="xs:px-5 flex items-center justify-space gap-1 xs:gap-4">
        <Box
          className="flex items-center bg-dark-900
                    xs:bg-transparent rounded-full"
        >
          <Box
            className="p-2 rounded-full cursor-pointer hover:bg-dark-700
                       text-yellow-400 hover:text-green-400"
          >
            <BiLike className="text-2xl" />
          </Box>
          <span className="text-xl text-green-400 font-bold pr-4">
            {post?.upvotes.toLocaleString()}
          </span>
          <Box
            className="p-2 rounded-full cursor-pointer hover:bg-dark-700
                        text-yellow-400 hover:text-red-400"
          >
            <BiDislike className="text-2xl" />
          </Box>
          <span className="text-xl text-red-400 font-bold pr-4">
            {post?.downvotes.toLocaleString()}
          </span>
        </Box>
        <Link to={`/community/${post?.community}/post/${post?.id}`}>
          <Box
            className="py-1 px-3 rounded-full cursor-pointer flex justify-center
                      items-center hover:bg-dark-700 text-white gap-2"
          >
            <FaComment className="text-xl" />
            <span className="text-lg text-cyan-400 font-bold">
              {post?.comments} comments
            </span>
          </Box>
        </Link>
      </Box>
      <Box
        className="hover:bg-dark-700 rounded-full text-white flex px-3 py-2
                  opacity-50 hover:opacity-100 cursor-pointer items-center"
      >
        <BsThreeDots className="" />
      </Box>
    </Box>
  );
}

export default PostDetailFooter;
