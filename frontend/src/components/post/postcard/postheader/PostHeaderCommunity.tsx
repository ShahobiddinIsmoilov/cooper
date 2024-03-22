import { Link } from "react-router-dom";
import { PostProps } from "../../../../interfaces/postProps";

export interface PostHeaderCommunityProps {
  post: PostProps;
}

export default function PostHeaderCommunity({
  post,
}: PostHeaderCommunityProps) {
  return (
    <div className="flex justify-between px-1 pt-1 xs:px-5 xs:py-2">
      <div className="flex items-center gap-2">
        <img
          src={`../../../../src/assets/user.png`}
          alt="community profile picture"
          className="w-10 xs:w-10 h-10 xs:h-10 min-w-10 xs:min-w-10 object-cover rounded-full"
        />
        <div className="text-xs xs:text-base">
          <Link
            to={`/user/${post.username}`}
            className="font-bold hover:underline text-orange-400"
          >
            {post.username}
          </Link>
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
