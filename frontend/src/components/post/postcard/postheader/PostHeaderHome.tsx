import { Avatar } from "@mantine/core";
import { PostProps } from "../../../../interfaces/postProps";
import CommunityLink from "./CommunityLink";

export interface PostHeaderHomeProps {
  post: PostProps;
}

export default function PostHeaderHome({ post }: PostHeaderHomeProps) {
  return (
    <div className="flex justify-between px-1 pt-1 xs:px-5 xs:py-2">
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
      <span className="cursor-pointer flex items-center opacity-50 pr-1 hover:opacity-100 xs:p-0">
        🔗
      </span>
    </div>
  );
}
