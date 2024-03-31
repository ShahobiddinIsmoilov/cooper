import { Avatar } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import CommunityLink from "../../post/postcard/postheader/CommunityLink";
import UserLink from "../../post/postcard/postheader/UserLink";

interface CommentCardProps {
  comment: CommentProps;
}

function CommentHeader({ comment }: CommentCardProps) {
  return (
    <div className="flex items-center">
      <div className="text-xs xs:text-base flex items-center gap-1" id="fucker">
        <Avatar />
        <CommunityLink community={comment.community} />
        <UserLink username={comment.username} user_id={comment.user} />
        <span className="opacity-50 text-sm"> ∙ 15 daqiqa oldin </span>
      </div>
    </div>
  );
}

export default CommentHeader;
