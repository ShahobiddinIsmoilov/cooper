import { Link } from "react-router-dom";
import { PostProps } from "../../../../interfaces/postProps";
import CommunityLink from "./CommunityLink";

export interface PostHeaderProps {
  post: PostProps;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex justify-between px-1 pt-1 xs:px-5 xs:py-2">
      <div className="flex items-center gap-4">
        <img
          src={`../../../../src/assets/${post.community}.jpg`}
          alt="community profile picture"
          className="w-10 xs:w-14 h-10 xs:h-14 min-w-10 xs:min-w-14 object-cover rounded-full"
        />

        <div className="text-xs xs:text-base">
          <CommunityLink community={post.community} />
          <div>
            <span className="opacity-50"> posted by </span>
            <Link to={`/user/${post.username}`}>
              <span className="font-bold hover:underline text-orange-400">
                {post.username}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <span
        className="cursor-pointer flex items-center opacity-50 pr-1
                  hover:opacity-100 xs:p-0"
      >
        🔗
      </span>
    </div>
  );
}
