import { Link } from "react-router-dom";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { CommentProps } from "../../../interfaces/commentProps";
import user from "../../../../src/assets/user.png";

interface CommentCardProps {
  comment: CommentProps;
  hidden: boolean;
  setHidden: (bool: boolean) => void;
}

function CommentHeader({ comment, hidden, setHidden }: CommentCardProps) {
  return (
    <div className="flex items-center">
      <button className="cursor-pointer mr-2">
        {hidden ? (
          <CiSquarePlus
            className="text-xl xs:text-2xl"
            onClick={() => {
              setHidden(false);
            }}
          />
        ) : (
          <CiSquareMinus
            className="text-xl xs:text-2xl"
            onClick={() => {
              setHidden(true);
            }}
          />
        )}
      </button>
      <img
        src={user}
        alt="user profile picture"
        className="w-6 h-6 xs:w-8 xs:h-8 rounded-full mr-2 min-w-6 xs:min-w-8"
      />
      <div className="text-xs xs:text-base" id="fucker">
        <Link to={`/user/${comment.username}`}>
          <span className="font-bold hover:underline text-orange-400 text-sm">
            abdulbosit_muhammadjonov
          </span>
        </Link>
        <span className="opacity-50 text-sm"> ∙ 15 daqiqa oldin </span>
      </div>
    </div>
  );
}

export default CommentHeader;
