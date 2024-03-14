import { Stack } from "@mui/material";
import { CommentProps } from "../../interfaces/commentProps";
import CommentCard from "./CommentCard";

interface CommentFeedProps {
  comments: CommentProps[];
}

function CommentFeed({ comments }: CommentFeedProps) {
  return (
    <Stack spacing="12px" className="px-4">
      {comments.map((post: CommentProps) => (
        <CommentCard key={post.id} comment={post} />
      ))}
    </Stack>
  );
}

export default CommentFeed;
