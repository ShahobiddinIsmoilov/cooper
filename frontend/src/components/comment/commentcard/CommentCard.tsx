import { useContext, useState } from "react";

import { CommentProps } from "../../../interfaces/commentProps";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import {
  CommentContext,
  CommentContextProps,
} from "../../../contexts/CommentContext";
import CommentList from "../CommentList";

interface CommentCardProps {
  comment: CommentProps;
  last: boolean;
}

function CommentCard({ comment, last }: CommentCardProps) {
  const { getReplies } = useContext(CommentContext) as CommentContextProps;
  const replies = getReplies(comment.id);
  const [hidden, setHidden] = useState(false);

  return (
    <div className="flex text-white">
      <div
        className={`w-[1px] ${last && "h-8"} bg-white ${
          comment.parent > 0 ? "ml-8 opacity-25" : "opacity-0"
        }`}
      />
      <div className="">
        <div className="flex">
          {comment.parent > 0 && <hr className="w-4 min-w-4 mt-8 opacity-25" />}
          <div
            className="border border-solid border-white border-opacity-25 p-2
                       mt-2 bg-dark-850 rounded-xl"
          >
            <div className="flex items-center">
              <CommentHeader
                comment={comment}
                hidden={hidden}
                setHidden={setHidden}
              />
            </div>
            <div className="flex">
              <div>
                {!hidden && (
                  <div className="mx-2 xs:mx-4 mt-2">{comment.body}</div>
                )}
                {!hidden && (
                  <CommentFooter
                    comment={comment}
                    replyCount={replies && replies.length}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {replies && replies.length > 0 && (
          <div className={`flex ${hidden ? "hidden" : ""}`}>
            <CommentList comments={replies} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
