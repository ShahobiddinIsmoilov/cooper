import { Link } from "react-router-dom";
import { PostProps } from "../../../interfaces/postProps";
import PostHeaderHome from "./postheader/PostHeaderHome";
import PostFooter from "./PostFooter";
import PostHeaderCommunity from "./postheader/PostHeaderCommunity";
import ReactHtmlParser from "react-html-parser";

export interface PostCardProps {
  post: PostProps;
  notCommunity?: boolean;
}

function PostCard({ post, notCommunity }: PostCardProps) {
  return (
    <div className="text-white xs:rounded-xl my-2">
      <div className="mx-4">
        {notCommunity ? (
          <PostHeaderHome post={post} />
        ) : (
          <PostHeaderCommunity post={post} />
        )}
      </div>
      <Link to={`/community/${post.community}/post/${post.id}`}>
        <p className="xs:text-xl font-bold py-2 px-4 hover:text-indigo-400">
          {post.title}
        </p>
      </Link>
      <div className="post-card mx-4 line-clamp-3">
        {ReactHtmlParser(post.body)}
      </div>
      <div className="mx-4">
        <PostFooter post={post} />
      </div>
    </div>
  );
}

export default PostCard;

// △▽
