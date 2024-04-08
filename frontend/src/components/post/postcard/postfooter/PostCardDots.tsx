import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark, FaRegFlag } from "react-icons/fa6";
import { Menu } from "@mantine/core";

export function PostCardDots({ post_id }: { post_id: number }) {
  function savePost() {}

  return (
    <div>
      <Menu position="bottom-end" offset={0} radius={12}>
        <Menu.Target>
          <button className="hover:bg-dark-600 rounded-full text-white flex p-3 opacity-55 hover:opacity-100 cursor-pointer items-center">
            <BsThreeDots />
          </button>
        </Menu.Target>
        <Menu.Dropdown className="bg-dark-850">
          <Menu.Item p={0}>
            <p className="text-lg flex gap-2 items-center hover:bg-dark-700 cursor-pointer px-4 py-2 rounded-lg">
              <FaRegBookmark />
              <span>Save</span>
            </p>
          </Menu.Item>
          <Menu.Item p={0}>
            <p className="text-lg flex gap-2 items-center hover:bg-dark-700 cursor-pointer px-4 py-2 rounded-lg">
              <FaRegFlag />
              <span>Report</span>
            </p>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
