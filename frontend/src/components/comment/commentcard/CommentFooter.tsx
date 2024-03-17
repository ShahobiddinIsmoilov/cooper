import { Box } from "@mui/material";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaReply } from "react-icons/fa6";

import { CommentProps } from "../../../interfaces/commentProps";

interface CommentCardProps {
  comment: CommentProps;
  replyCount: number;
}

function CommentFooter({ comment, replyCount }: CommentCardProps) {
  return (
    <Box className="flex mt-2 ml-4">
      <Box
        className="flex items-center gap-2 bg-dark-900
                xs:bg-transparent rounded-full"
      >
        <Box
          className="p-1 rounded-full cursor-pointer hover:bg-dark-700
                   text-yellow-400 hover:text-green-400"
        >
          <BiLike className="text-xl" />
        </Box>
        <span className="font-bold">{comment.upvotes}</span>
        <Box
          className="p-1 rounded-full cursor-pointer hover:bg-dark-700
                  text-yellow-400 hover:text-red-400"
        >
          <BiDislike className="text-xl" />
        </Box>
        <Box
          className="font-bold ml-4 px-2 py-1 rounded-full
                    hover:bg-dark-700 cursor-pointer text-sky-300"
        >
          Reply
        </Box>
        {replyCount > 0 && (
          <Box className="font-bold opacity-50 flex items-center gap-2 px-2">
            <FaReply />
            {replyCount}
            {replyCount > 1 ? " replies" : " reply"}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CommentFooter;
