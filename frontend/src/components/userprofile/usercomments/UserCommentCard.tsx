import { CommentProps } from "../../../interfaces/commentProps";
import UserCommentHeader from "./UserCommentHeader";
import UserCommentFooter from "./UserCommentFooter";
import ReactHtmlParser from "react-html-parser";

interface UserCommentCardProps {
  comment: CommentProps;
}

export default function UserCommentCard({ comment }: UserCommentCardProps) {
  return (
    <div className="p-2">
      <UserCommentHeader comment={comment} />
      <div className="post-detail mx-2 xs:mx-4 mt-2">
        {ReactHtmlParser(comment.body)}
      </div>
      <UserCommentFooter comment={comment} />
    </div>
  );
}
