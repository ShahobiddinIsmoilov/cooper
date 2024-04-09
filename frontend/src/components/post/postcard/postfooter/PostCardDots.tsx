import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark, FaBookmark, FaRegFlag } from "react-icons/fa6";
import { Menu } from "@mantine/core";
import useCredentials from "../../../../services/useCredentials";
import { useState } from "react";
import { PostProps } from "../../../../interfaces/postProps";

export function PostCardDots({ post }: { post: PostProps }) {
  const api = useCredentials();
  const [saved, setSaved] = useState(post.saved);

  function handleClick() {
    saved
      ? api
          .post("/api/post/action/", { action: "undo_save", post: post.id })
          .then(() => setSaved(false))
      : api
          .post("/api/post/action/", { action: "save", post: post.id })
          .then(() => setSaved(true));
  }

  return (
    <div>
      <Menu position="bottom-end" offset={0} radius={12}>
        <Menu.Target>
          <button className="hover:bg-dark-600 rounded-full text-white flex p-3 opacity-55 hover:opacity-100 cursor-pointer items-center">
            <BsThreeDots />
          </button>
        </Menu.Target>
        <Menu.Dropdown className="bg-dark-850">
          <Menu.Item p={0} onClick={handleClick}>
            <div className="text-lg flex gap-2 items-center hover:bg-dark-700 cursor-pointer px-4 py-2 rounded-lg">
              {saved ? <FaBookmark size={22} /> : <FaRegBookmark size={22} />}
              <span>{saved ? "Remove from Saved" : "Save"}</span>
            </div>
          </Menu.Item>
          <Menu.Item p={0}>
            <div className="text-lg flex gap-2 items-center hover:bg-dark-700 cursor-pointer px-4 py-2 rounded-lg">
              <FaRegFlag size={22} />
              <span>Report</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
