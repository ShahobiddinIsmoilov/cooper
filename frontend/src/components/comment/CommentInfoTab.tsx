import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { CommentProps } from "../../interfaces/commentProps";

interface CommentCardProps {
  comment: CommentProps;
}

function CommentInfoTab({ comment }: CommentCardProps) {
  return (
    <Box className="flex justify-between py-2">
      <Box>
        <Link to={`/user/${comment.username}`}>
          <span
            className="font-bold hover:underline text-xs
                        xs:text-base text-orange-400"
          >
            {comment.username}
          </span>
        </Link>
        <span className="opacity-50 text-xs xs:text-base"> ∙ 3h ago</span>
      </Box>
    </Box>
  );
}

export default CommentInfoTab;
