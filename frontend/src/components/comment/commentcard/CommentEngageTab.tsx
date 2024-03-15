import { Box } from "@mui/material";
import { BiDislike, BiLike } from "react-icons/bi";

import { CommentProps } from "../../../interfaces/commentProps";

interface CommentCardProps {
  comment: CommentProps;
}

function CommentEngageTab({ comment }: CommentCardProps) {
  return (
    <Box className="flex py-2">
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
          className="font-bold ml-4 px-3 py-1 rounded-full
                    hover:bg-dark-700 cursor-pointer text-sky-300"
        >
          Reply
        </Box>
      </Box>
    </Box>
  );
}

export default CommentEngageTab;
