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
}

function CommentCard({ comment }: CommentCardProps) {
  const { getReplies } = useContext(CommentContext) as CommentContextProps;
  const replies = getReplies(comment.id);
  const [hidden, setHidden] = useState(false);

  return (
    <Box className="text-white">
      <Box className="flex items-center mt-4">
        {comment.parent > 0 && <hr className="w-4 opacity-25" />}
        <CommentHeader
          comment={comment}
          hidden={hidden}
          setHidden={setHidden}
        />
      </Box>
      <Box className="flex">
        {!hidden && (
          <Box
            className={`w-[1px] bg-white ${
              replies?.length > 0 ? "opacity-25" : "opacity-0"
            } ${comment.parent > 0 ? "ml-7" : "ml-3"}`}
          />
        )}
        <Box>
          {!hidden && <Box className="text-md ml-4 mt-2">{comment.body}</Box>}
          {!hidden && (
            <CommentFooter
              comment={comment}
              replyCount={replies && replies.length}
            />
          )}

          {replies && replies.length > 0 && (
            <Box className={`flex ${hidden ? "hidden" : ""}`}>
              <CommentList comments={replies} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CommentCard;
