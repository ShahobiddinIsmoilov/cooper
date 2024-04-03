import { PostProps } from "../../interfaces/postProps";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../utils/Line";
import CommentFeed from "../comment/CommentFeed";
import ReactHtmlParser from "react-html-parser";
import CommentProvider from "../../contexts/CommentContext";
import PostFooter from "./postcard/PostFooter";

interface PostDetailProps {
  post: PostProps;
  community: number;
  community_name: string;
  community_link: string;
}

function PostDetail({
  post,
  community,
  community_name,
  community_link,
}: PostDetailProps) {
  return (
    <div className="p-2">
      <PostDetailHeader post={post} />
      <div className="text-xl xs:text-2xl font-bold text-white p-2">
        {post.title}
      </div>
      <div className="post-detail mt-2 mx-2 overflow-hidden break-words">
        {ReactHtmlParser(post.body)}
      </div>
      <PostFooter post={post} />
      <Line />
      {post && (
        <CommentProvider
          post_id={post.id}
          post_title={post.title}
          community={community}
          community_name={community_name}
          community_link={community_link}
        >
          <CommentFeed />
        </CommentProvider>
      )}
    </div>
  );
}

export default PostDetail;
