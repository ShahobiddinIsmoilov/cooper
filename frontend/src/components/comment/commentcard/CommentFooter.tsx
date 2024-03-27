import { BiDislike, BiLike } from "react-icons/bi";
import { FaReply } from "react-icons/fa6";

import { CommentProps } from "../../../interfaces/commentProps";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

interface CommentCardProps {
  comment: CommentProps;
  replyCount: number;
  setShowReply: (value: boolean) => void;
}

function CommentFooter({
  comment,
  replyCount,
  setShowReply,
}: CommentCardProps) {
  let { screenWidth } = useWindowSize();

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
        <button
          onClick={() => setShowReply(true)}
          className="font-bold xs:ml-4 px-2 py-1 rounded-full text-xs xs:text-sm hover:bg-dark-700 cursor-pointer text-sky-300"
        >
          Reply
        </button>
        {replyCount > 0 && (
          <div className="text-xs xs:text-sm font-bold opacity-50 flex items-center gap-1 xs:gap-2 xs:px-2">
            <FaReply />
            {replyCount}
            {screenWidth > 576 ? (replyCount > 1 ? " replies" : " reply") : ""}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentFooter;
