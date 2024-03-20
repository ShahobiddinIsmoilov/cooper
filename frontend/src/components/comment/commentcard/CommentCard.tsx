import { useContext, useState } from "react";
import { Box } from "@mui/material";

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
    <Box className="flex text-white">
      <Box
        className={`w-[1px] ${last && "h-8"} bg-white ${
          comment.parent > 0 ? "ml-8 opacity-25" : "opacity-0"
        }`}
      />
      <Box className="">
        <Box className="flex">
          {comment.parent > 0 && <hr className="w-4 min-w-4 mt-8 opacity-25" />}
          <Box
            className="border border-solid border-white border-opacity-25 p-2
                       mt-2 bg-dark-850 rounded-xl"
          >
            <Box className="flex items-center">
              <CommentHeader
                comment={comment}
                hidden={hidden}
                setHidden={setHidden}
              />
            </Box>
            <Box className="flex">
              <Box>
                {!hidden && (
                  <Box className="mx-2 xs:mx-4 mt-2 xs:text-lg">
                    {comment.body}
                  </Box>
                )}
                {!hidden && (
                  <CommentFooter
                    comment={comment}
                    replyCount={replies && replies.length}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {replies && replies.length > 0 && (
          <Box className={`flex ${hidden ? "hidden" : ""}`}>
            <CommentList comments={replies} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CommentCard;
