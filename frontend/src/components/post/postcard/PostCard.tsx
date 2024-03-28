import { Link } from "react-router-dom";
import { PostProps } from "../../../interfaces/postProps";
import PostHeaderHome from "./postheader/PostHeaderHome";
import PostFooter from "./PostFooter";
import PostHeaderCommunity from "./postheader/PostHeaderCommunity";
import ReactHtmlParser from "react-html-parser";

export interface PostCardProps {
  post: PostProps;
  home?: boolean;
}

function PostCard({ post, home }: PostCardProps) {
  return (
    <div
      key={post.id}
      className="text-white hover:bg-dark-750 xs:rounded-xl my-2"
    >
      {home ? (
        <PostHeaderHome post={post} />
      ) : (
        <PostHeaderCommunity post={post} />
      )}
      <Link to={`/community/${post.community}/post/${post.id}`}>
        <p className="xs:text-xl font-bold pt-1 px-1 xs:px-5 xs:pt-1">
          {post.title}
        </p>
      </Link>
      <div className="post-card line-clamp-3">{ReactHtmlParser(post.body)}</div>
      <PostFooter post={post} />
    </div>
  );
}

export default PostCard;

// △▽
