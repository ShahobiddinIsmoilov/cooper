import { PostProps } from "../../../../interfaces/postProps";
import UserLink from "./UserLink";

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
          className="w-8 min-w-8 object-cover rounded-full"
        />
        <UserLink username={post.username} user_id={post.user_id} />
        <span className="opacity-50 text-xs xs:text-base"> ∙ 3h ago</span>
      </div>
      <span className="cursor-pointer flex items-center opacity-50 pr-1 hover:opacity-100 xs:p-0">
        🔗
      </span>
    </div>
  );
}
