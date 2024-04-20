import { PostProps } from "../../../../interfaces/postProps";
import UserLink from "./UserLink";
import UserLinkAvatar from "./UserLinkAvatar";

export interface PostHeaderCommunityProps {
  post: PostProps;
}

export default function PostHeaderCommunity({
  post,
}: PostHeaderCommunityProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <UserLinkAvatar username={post.username} avatar={post.user_avatar} />
        <UserLink username={post.username} />
        <span className="opacity-50 text-xs xs:text-base"> ∙ 8 soat oldin</span>
      </div>
      <button className="rounded-full p-2 cursor-pointer opacity-50 hover:opacity-100 hover:bg-dark-600">
        🔗
      </button>
    </div>
  );
}
