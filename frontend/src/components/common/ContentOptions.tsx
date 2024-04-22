import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark, FaBookmark, FaRegFlag } from "react-icons/fa6";
import { Menu } from "@mantine/core";
import { useState } from "react";
import { PostProps } from "../../interfaces/postProps";
import useCredentials from "../../services/useCredentials";

export function ContentOptions({ post, bg }: { post: PostProps; bg: string }) {
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
          <button
            className={`hover:bg-dark-${bg} rounded-full text-white/50 hover:text-white flex p-[10px] cursor-pointer items-center`}
          >
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
