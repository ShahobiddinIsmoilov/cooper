import { Link } from "react-router-dom";
import { PostHeaderHomeProps } from "./postheader/PostHeaderHome";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { FaFlag, FaBookmark } from "react-icons/fa6";
import postAction from "../../../services/post/postAction";
import { useState } from "react";

export default function PostFooter({ post }: PostHeaderHomeProps) {
  const { screenWidth } = useWindowSize();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [votes, setVotes] = useState(post.votes);

  function handleUpvote() {
    setUpvoted(true);
    setDownvoted(false);
    setVotes((votes) => (downvoted ? votes + 2 : votes + 1));
    postAction(post.id, "upvote");
  }

  function handleDownvote() {
    setDownvoted(true);
    setUpvoted(false);
    setVotes((votes) => (upvoted ? votes - 2 : votes - 1));
    postAction(post.id, "downvote");
  }

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center justify-space gap-1 xs:gap-4">
        <div className="flex items-center gap-1 bg-dark-900 xs:bg-transparent rounded-full">
          <button
            onClick={handleUpvote}
            className={`p-2 rounded-full cursor-pointer hover:bg-dark-600 text-yellow-400 hover:text-green-400`}
          >
            {upvoted ? (
              <BiSolidLike className={`text-xl xs:text-2xl text-green-400`} />
            ) : (
              <BiLike className={`text-xl xs:text-2xl`} />
            )}
          </button>
          <span
            className={
              votes > 0
                ? "text-green-400 xs:text-lg font-bold"
                : votes === 0
                ? "xs:text-lg font-bold"
                : "text-red-400 xs:text-lg font-bold"
            }
          >
            {votes > 0 ? "+" + votes.toLocaleString() : votes}
          </span>
          <button
            onClick={handleDownvote}
            className="p-2 rounded-full cursor-pointer hover:bg-dark-600 text-yellow-400 hover:text-red-400"
          >
            {downvoted ? (
              <BiSolidDislike className={`text-xl xs:text-2xl text-red-400`} />
            ) : (
              <BiDislike className={`text-xl xs:text-2xl`} />
            )}
          </button>
        </div>
        <Link to={`/community/${post.community}/post/${post.id}`}>
          <div className="py-1 px-3 rounded-full cursor-pointer flex justify-center bg-dark-900 xs:bg-transparent items-center hover:bg-dark-600 text-white gap-2">
            <FaComment className="text-lg xs:text-xl" />
            <span className="xs:text-lg text-cyan-400 font-bold">
              {screenWidth < 576
                ? post?.comments.toLocaleString()
                : post?.comments === 1
                ? "1 comment"
                : post?.comments.toLocaleString() + " comments"}
            </span>
          </div>
        </Link>
      </div>
      <PostCardDots />
    </div>
  );
}

function PostCardDots() {
  return (
    <div>
      <Menu
        menuClassName="bg-dark-850 -translate-x-14 rounded-xl py-2 z-20"
        menuButton={
          <button className="hover:bg-dark-600 rounded-full text-white flex p-3 opacity-55 hover:opacity-100 cursor-pointer items-center">
            <BsThreeDots />
          </button>
        }
      >
        <MenuItem>
          <p className="flex gap-2 items-center hover:bg-dark-700 cursor-pointer px-4 py-2 rounded-lg">
            <FaBookmark />
            <span>Save</span>
          </p>
        </MenuItem>
        <MenuItem>
          <p className="flex gap-2 items-center hover:bg-dark-700 cursor-pointer px-4 py-2 rounded-lg">
            <FaFlag />
            <span>Report</span>
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}
