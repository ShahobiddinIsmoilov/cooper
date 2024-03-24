import { PostProps } from "../../interfaces/postProps";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../utils/Line";
import PostDetailFooter from "./PostDetailFooter";
import CommentFeed from "../comment/CommentFeed";

interface PostDetailProps {
  post: PostProps;
}

function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="p-2">
      <PostDetailHeader post={post} />
      <div className="text-xl xs:text-2xl font-bold text-white p-2">
        {post.title}
      </div>
      <div className="text-base xs:text-lg text-white opacity-75 mx-2 mt-2 mb-4">
        {post.body}
      </div>
      <PostDetailFooter post={post} />
      <Line />
      <CommentFeed />
    </div>
  );
}

export default PostDetail;
