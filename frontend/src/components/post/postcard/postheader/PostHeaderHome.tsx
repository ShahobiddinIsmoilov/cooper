import { PostProps } from "../../../../interfaces/postProps";
import CommunityLink from "./CommunityLink";

export interface PostHeaderHomeProps {
  post: PostProps;
}

export default function PostHeaderHome({ post }: PostHeaderHomeProps) {
  return (
    <div className="flex justify-between px-1 pt-1 xs:px-5 xs:py-2">
      <div className="flex items-center gap-2">
        <img
          src={`../../../../src/assets/${post.community}.jpg`}
          alt="community profile picture"
          className="w-8 xs:w-10 h-8 xs:h-10 min-w-8 xs:min-w-10 object-cover rounded-full"
        />

        <CommunityLink community={post.community} />
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
