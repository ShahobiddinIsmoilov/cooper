import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import { useWindowSize } from "../../contexts/WindowSizeContext";
import { PostProps } from "../../interfaces/postProps";

interface PostDetailFooterProps {
  post: PostProps;
}

function PostDetailFooter({ post }: PostDetailFooterProps) {
  let { screenWidth } = useWindowSize();

  return (
    <div className="flex justify-between xs:pr-2 pb-2">
      <div className="xs:px-5 flex items-center justify-space gap-1 xs:gap-4">
        <div className="flex items-center">
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-dark-700
                       text-yellow-400 hover:text-green-400"
          >
            <BiLike className="text-lg xs:text-2xl" />
          </div>
          <span className="xs:text-xl text-green-400 font-bold pr-4">
            {post?.upvotes?.toLocaleString()}
          </span>
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-dark-700
                        text-yellow-400 hover:text-red-400"
          >
            <BiDislike className="text-lg xs:text-2xl" />
          </div>
          <span className="xs:text-xl text-red-400 font-bold pr-4">
            {post?.downvotes?.toLocaleString()}
          </span>
        </div>
        <Link to={`/c/${post?.community}/post/${post?.id}`}>
          <div
            className="py-1 px-3 rounded-full cursor-pointer flex justify-center
                      items-center hover:bg-dark-700 text-white gap-2"
          >
            <FaComment className="text-lg xs:text-xl" />
            <span className="xs:text-lg text-cyan-400 font-bold">
              {screenWidth < 576
                ? post?.comments?.toLocaleString()
                : post?.comments?.toLocaleString() + " comments"}
            </span>
          </div>
        </Link>
      </div>
      <div
        className="hover:bg-dark-700 rounded-full text-white flex px-3 py-2
                  opacity-50 hover:opacity-100 cursor-pointer items-center"
      >
        <BsThreeDots />
      </div>
    </div>
  );
}

export default PostDetailFooter;
