import { Box } from "@mui/material";
import { PostProps } from "../../interfaces/postProps";
import PostDetailInfoTab from "./PostDetailInfoTab";
import Line from "../../utils/Line";
import PostDetailEngageTab from "./PostDetailEngageTab";
import CommentPost from "../comment/CommentPost";
import CommentList from "../comment/CommentList";

interface PostDetailProps {
  post: PostProps | null;
}

function PostDetail({ post }: PostDetailProps) {
  return (
    <Box className="p-2">
      <PostDetailInfoTab post={post} />
      <Box className="text-2xl font-bold text-white p-2">{post?.title}</Box>
      <Box className="text-lg text-white opacity-75 mx-2 mt-2 mb-4">
        {post?.body}
      </Box>
      <PostDetailEngageTab post={post} />
      <Line />
      <CommentPost />
      <CommentList />
    </Box>
  );
}

export default PostDetail;
