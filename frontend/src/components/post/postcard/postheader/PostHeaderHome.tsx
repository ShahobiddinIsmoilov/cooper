import { Avatar } from "@mantine/core";
import { PostProps } from "../../../../interfaces/postProps";
import CommunityLink from "./CommunityLink";

export interface PostHeaderHomeProps {
  post: PostProps;
}

export default function PostHeaderHome({ post }: PostHeaderHomeProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Avatar
          src={`../../../../src/assets/avatar_${post.community_link}.jpg`}
        />
        <div className="text-lg">
          <CommunityLink
            community_name={post.community_link}
            community_link={post.community_link}
          />
        </div>
        <span className="opacity-50 text-xs xs:text-base">
          {" "}
          ∙ 22 daqiqa oldin
        </span>
      </div>
      <button className="rounded-full p-2 cursor-pointer opacity-50 hover:opacity-100 hover:bg-dark-600">
        🔗
      </button>
    </div>
  );
}
