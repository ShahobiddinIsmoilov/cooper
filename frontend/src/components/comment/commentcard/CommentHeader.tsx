import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { CommentProps } from "../../../interfaces/commentProps";

interface CommentCardProps {
  comment: CommentProps;
  hidden: boolean;
  setHidden: (bool: boolean) => void;
}

function CommentHeader({ comment, hidden, setHidden }: CommentCardProps) {
  return (
    <Box className="flex items-center" id="comment-header-box">
      <button className="cursor-pointer mr-2" id="comment-collapse-box">
        {hidden ? (
          <CiSquarePlus
            size={24}
            onClick={() => {
              setHidden(false);
            }}
            id="comment-show"
          />
        ) : (
          <CiSquareMinus
            size={24}
            onClick={() => {
              setHidden(true);
            }}
            id="comment-hide"
          />
        )}
      </button>
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

export default CommentHeader;
