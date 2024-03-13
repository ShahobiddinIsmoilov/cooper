import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostInfoTabProps } from "./PostInfoTab";
import { useContext } from "react";
import {
  WindowSizeContext,
  WindowSizeProps,
} from "../../contexts/WindowSizeContext";

function PostEngageTab({ post }: PostInfoTabProps) {
  let { screenWidth } = useContext(WindowSizeContext) as WindowSizeProps;

  return (
    <Box className="flex justify-between xs:pr-3 pt-2 xs:pb-1">
      <Box className="xs:px-5 flex items-center justify-space gap-1 xs:gap-4">
        <span
          className="flex items-center gap-1 bg-secondary
                    xs:bg-transparent rounded-full"
        >
          <span
            className="hover:bg-gray-600 cursor-pointer
                      rounded-full p-[5px] xs:p-2"
          >
            👍
          </span>
          <span
            className={
              post.votes > 0
                ? "text-green-400 xs:text-lg font-bold"
                : "text-red-400 xs:text-lg font-bold"
            }
          >
            {post.votes > 0 ? "+" + post.votes.toLocaleString() : post.votes}
          </span>
          <span
            className="hover:bg-gray-600 cursor-pointer
                      rounded-full p-[5px] xs:p-2"
          >
            👎
          </span>
        </span>
        <Link to={post.url}>
          <span
            className="xs:text-lg font-bold text-cyan-400 rounded-full
                      hover:bg-gray-600 px-4 py-2 bg-secondary
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
        className="text-xl opacity-50 hover:bg-gray-600 px-3 py-2
                    rounded-full hover:opacity-100 cursor-pointer"
      >
        ∙∙∙
      </span>
    </Box>
  );
}

export default PostEngageTab;
