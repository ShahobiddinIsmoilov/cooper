import { PostProps } from "../../interfaces/postProps";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../utils/Line";
import PostDetailFooter from "./PostDetailFooter";
import CommentFeed from "../comment/CommentFeed";
import ReactHtmlParser from "react-html-parser";
import CommentProvider from "../../contexts/CommentContext";

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
      <div className="post-detail overflow-hidden break-words">
        {ReactHtmlParser(post.body)}
      </div>
      <PostDetailFooter post={post} />
      <Line />
      {post && (
        <CommentProvider post_id={post.id}>
          <CommentFeed />
        </CommentProvider>
      )}
    </div>
  );
}

export default PostDetail;
