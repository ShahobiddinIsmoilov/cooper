import { BiDislike, BiLike } from "react-icons/bi";
import { CommentProps } from "../../../interfaces/commentProps";

interface CommentCardProps {
  comment: CommentProps;
}

function CommentFooter({ comment }: CommentCardProps) {
  return (
    <div className="flex mt-1 xs:mt-2 ml-2 xs:ml-4">
      <div className="flex items-center gap-1 xs:gap-2">
        <div className="p-1 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-green-400">
          <BiLike className="xs:text-lg" />
        </div>
        <span className="font-bold">{comment.upvotes}</span>
        <div className="p-1 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-red-400">
          <BiDislike className="xs:text-lg" />
        </div>
      </div>
    </div>
  );
}

export default CommentFooter;
