import { Box, Stack } from "@mui/material";

import CommentCard from "./commentcard/CommentCard";
import { CommentProps } from "../../interfaces/commentProps";

interface CommentListProps {
  comments: CommentProps[];
}

function CommentList({ comments }: CommentListProps) {
  console.log(comments, "WTF?");

  return (
    <Box>
      <Stack>
        {comments?.length > 0 &&
          comments.map((comment: CommentProps) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </Stack>
    </Box>
  );
}

export default CommentList;
