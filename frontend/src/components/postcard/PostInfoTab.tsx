import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostProps } from "../../pages/HomePage";

export interface PostInfoTabProps {
  post: PostProps;
}

export default function PostInfoTab({ post }: PostInfoTabProps) {
  return (
    <Box className="flex justify-between px-1 pt-1 xs:px-5 xs:py-2">
      <Box>
        <span className="opacity-50 text-xs xs:text-base">in </span>
        <Link to={`/community/${post.community}`}>
          <span
            className="font-bold hover:underline text-xs
                        xs:text-base"
          >
            {post.community}{" "}
          </span>
        </Link>
        <span className="opacity-50 text-xs xs:text-base"> ∙ posted by </span>
        <Link to={`/user/${post.username}`}>
          <span
            className="font-bold hover:underline text-xs
                        xs:text-base"
          >
            {post.username}
          </span>
        </Link>
        <span className="opacity-50 text-xs xs:text-base"> ∙ 3h ago</span>
      </Box>
      <span
        className="cursor-pointer flex items-center opacity-50 pr-1
                  hover:opacity-100 text-xs xs:text-base xs:p-0"
      >
        🔗
      </span>
    </Box>
  );
}
