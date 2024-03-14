import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PostProps } from "../../interfaces/postProps";
import PostInfoTab from "./PostInfoTab";
import PostEngageTab from "./PostEngageTab";

export interface PostCardProps {
  post: PostProps;
  handleClick: () => void;
}

function PostCard({ post, handleClick }: PostCardProps) {
  return (
    <Box
      key={post.id}
      className="text-white px-4 py-2 hover:bg-dark-700
                xs:rounded-xl"
    >
      <PostInfoTab post={post} />
      <Link
        to={`/community/${post.community}/post/${post.id}`}
        onClick={handleClick}
      >
        <p
          className="text-base font-bold pt-1 px-1 xs:px-5
                    xs:pt-1 xs:text-xl "
        >
          {post.title}
        </p>
        <p
          className="px-1 xs:px-5 my-2 text-base xs:text-lg
                      opacity-75 line-clamp-3"
        >
          {post.body}
        </p>
      </Link>
      <PostEngageTab post={post} />
    </Box>
  );
}

export default PostCard;

// △▽
