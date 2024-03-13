import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostProps } from "../pages/HomePage";

export interface PostCardProps {
  post: PostProps;
  xs: boolean;
}

function PostCard({ post, xs }: PostCardProps) {
  return (
    <Box
      key={post.id}
      className="text-white bg-gray-800 max-w-3xl
                hover:bg-gray-700 rounded-xl px-4"
    >
      <Box className="flex justify-between xs:px-5 xs:py-2">
        <Box>
          <span className="opacity-50 text-xs xs:text-base">in </span>
          <Link to={`/community/${post.community}`}>
            <span className="font-bold hover:underline text-xs xs:text-base">
              {post.community}{" "}
            </span>
          </Link>
          <span className="opacity-50 text-xs xs:text-base"> ∙ posted by </span>
          <Link to={`/user/${post.username}`}>
            <span className="font-bold hover:underline text-xs xs:text-base">
              {post.username}
            </span>
          </Link>
          <span className="opacity-50 text-xs xs:text-base"> ∙ 3h ago</span>
        </Box>
        <span
          className="cursor-pointer flex items-center opacity-50
                    hover:opacity-100 text-xs xs:text-base pr-4 xs:p-0"
        >
          🔗
        </span>
      </Box>
      <Link to={`/community/${post.community}/post/${post.id}`}>
        <p className="xs:px-5 pt-2 xs:pt-0 text-base xs:text-xl font-bold">
          {post.title}
        </p>
        {/* <p className="xs:px-5 text-base xs:text-lg opacity-75">{post.body}</p> */}
      </Link>
      <Box className="flex justify-between pr-2 xs:pr-3 pt-2 xs:pb-2">
        <Box className="xs:px-5 flex items-center justify-space xs:gap-4">
          <span className="flex items-center xs:gap-1">
            <span
              className="hover:bg-gray-600 cursor-pointer
                      rounded-full p-2"
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
                      rounded-full p-2"
            >
              👎
            </span>
          </span>
          <Link to={post.url}>
            <span
              className="xs:text-lg font-bold text-cyan-400 rounded-full
                          hover:bg-gray-600 px-4 py-2"
            >
              💬{" "}
              {xs
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
    </Box>
  );
}

export default PostCard;

// △▽
