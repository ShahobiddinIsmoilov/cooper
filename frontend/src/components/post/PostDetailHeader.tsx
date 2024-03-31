import { useNavigate } from "react-router-dom";
import { PostProps } from "../../interfaces/postProps";
import { FaArrowLeft } from "react-icons/fa6";
import UserLink from "./postcard/postheader/UserLink";

export interface PostDetailHeaderProps {
  post: PostProps;
}

function PostDetailHeader({ post }: PostDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="p-2 flex justify-between text-white">
      <div className="flex items-center">
        <div
          className="p-2 rounded-full cursor-pointer bg-dark-800 hover:bg-dark-700"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-2xl" />
        </div>
        <div className="px-4 flex gap-2">
          <UserLink username={post?.username} user_id={post?.user} />
          <span className="opacity-50 text-xs xs:text-base"> ∙ 3h ago</span>
        </div>
      </div>
      <span className="cursor-pointer flex items-center opacity-50 pr-1 hover:opacity-100 text-xs xs:text-base xs:p-0">
        🔗
      </span>
    </div>
  );
}

export default PostDetailHeader;
