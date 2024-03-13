import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostProps } from "../pages/HomePage";
import PostInfoTab from "./postcard/PostInfoTab";
import PostEngageTab from "./postcard/PostEngageTab";

export interface PostCardProps {
  post: PostProps;
  size: number;
}

function PostCard({ post }: PostCardProps) {
  return (
    <Box
      key={post.id}
      className="text-white bg-gray-800 max-w-3xl
                hover:bg-gray-700 xs:rounded-xl px-4"
    >
      <PostInfoTab post={post} />
      <Link to={`/community/${post.community}/post/${post.id}`}>
        <p className="text-base font-bold pt-1 px-1 xs:px-5 xs:pt-0 xs:text-xl ">
          {post.title}
        </p>
        {/* <p className="xs:px-5 text-base xs:text-lg opacity-75">{post.body}</p> */}
      </Link>
      <PostEngageTab post={post} />
    </Box>
  );
}

export default PostCard;

// △▽
