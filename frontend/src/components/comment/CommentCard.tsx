import { Box } from "@mui/material";
import { CommentProps } from "../../interfaces/commentProps";
import CommentInfoTab from "./CommentInfoTab";
import CommentEngageTab from "./CommentEngageTab";

interface CommentEngageProps {
  comment: CommentProps;
}

function CommentCard({ comment }: CommentEngageProps) {
  return (
    <Box className="text-white">
      <CommentInfoTab comment={comment} />
      <Box className="text-lg">{comment.body}</Box>
      <CommentEngageTab comment={comment} />
    </Box>
  );
}

export default CommentCard;
