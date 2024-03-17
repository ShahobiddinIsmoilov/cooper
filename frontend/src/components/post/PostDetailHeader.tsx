import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { PostProps } from "../../interfaces/postProps";
import { FaArrowLeft } from "react-icons/fa6";

export interface PostDetailHeaderProps {
  post: PostProps | null;
}

function PostDetailHeader({ post }: PostDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box className="p-2 flex justify-between text-white">
      <Box className="flex items-center">
        <Box
          className="p-2 rounded-full cursor-pointer bg-dark-800
                   hover:bg-dark-700"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-2xl" />
        </Box>
        <Box className="px-4">
          <Link to={`/user/${post?.username}`}>
            <span
              className="font-bold hover:underline text-xs text-orange-400
                      xs:text-base"
            >
              {post?.username}
            </span>
          </Link>
          <span className="opacity-50 text-xs xs:text-base"> ∙ 3h ago</span>
        </Box>
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

export default PostDetailHeader;
