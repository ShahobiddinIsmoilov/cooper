import { Box } from "@mui/material";

import { PostProps } from "../../interfaces/postProps";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../utils/Line";
import PostDetailFooter from "./PostDetailFooter";
import CommentFeed from "../comment/CommentFeed";

interface PostDetailProps {
  post: PostProps | null;
}

function PostDetail({ post }: PostDetailProps) {
  return (
    <Box className="p-2">
      <PostDetailHeader post={post} />
      <Box className="text-2xl font-bold text-white p-2">{post?.title}</Box>
      <Box className="text-lg text-white opacity-75 mx-2 mt-2 mb-4">
        {post?.body}
      </Box>
      <PostDetailFooter post={post} />
      <Line />
      <CommentFeed />
    </Box>
  );
}

export default PostDetail;
