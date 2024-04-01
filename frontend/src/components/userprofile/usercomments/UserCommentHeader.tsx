import { Avatar, Flex } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import CommunityLink from "../../post/postcard/postheader/CommunityLink";
import UserLink from "../../post/postcard/postheader/UserLink";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

interface CommentCardProps {
  comment: CommentProps;
}

export default function CommentHeader({ comment }: CommentCardProps) {
  return (
    <Flex gap={0} className="text-xs xs:text-base">
      <Avatar
        src={`../../../../src/assets/avatar_${comment.community_name}.jpg`}
      />
      <div className="mt-[6px] ml-2">
        <div className="inline-block">
          <CommunityLink
            community_name={comment.community_name}
            community_link={comment.community_link}
          />
        </div>
        <BsDot className="inline-block" />
        <Link
          to={`/community/${comment.community_link}/post/${comment.post}`}
          className="hover:underline"
        >
          <span className="font-bold">{comment.post_title}</span>
        </Link>
        <div className="w-[38px]" />
        <div className="inline-block mr-2">
          <UserLink username={comment.username} user_id={comment.user} />
        </div>
        <div className="inline-block">
          {comment.parent === 0 ? (
            <span className="opacity-50">commented 15 minutes ago </span>
          ) : (
            <Flex className="gap-2">
              <span className="opacity-50">replied to </span>
              <UserLink
                username={comment.parent_username}
                user_id={comment.parent_user}
              />
              <span className="opacity-50">3 hours ago </span>
            </Flex>
          )}
        </div>
      </div>
    </Flex>
  );
}
