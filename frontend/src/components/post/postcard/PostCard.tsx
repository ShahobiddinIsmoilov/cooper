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
      className="text-white px-2 py-2 hover:bg-dark-700 xs:rounded-xl"
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
      {/* <p className="px-1 xs:px-5 my-2 opacity-75 line-clamp-3">
          {ReactHtmlParser(post.body)}
        </p> */}
      <PostFooter post={post} />
    </div>
  );
}

export default PostCard;

// △▽
