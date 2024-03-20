import { useContext } from "react";
import { Box } from "@mui/material";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import {
  CommentContext,
  CommentContextProps,
} from "../../contexts/CommentContext";

function CommentFeed() {
  const { getReplies } = useContext(CommentContext) as CommentContextProps;
  const rootComments = getReplies(0);

  return (
    <Box className="mb-12">
      <CommentForm />
      {rootComments != null && rootComments.length > 0 && (
        <CommentList comments={rootComments} />
      )}
    </Box>
  );
}

export default CommentFeed;
