import { Menu } from "@mantine/core";
import { FaBell } from "react-icons/fa";
import NotificationList from "./NotificationList";

export default function Notifications({ count }: { count: number }) {
  return (
    <Menu width={400} position="bottom-end" offset={4} radius={12}>
      <Menu.Target>
        <button className="relative hover:bg-dark-700 border-white border-opacity-25 rounded-full p-3">
          <FaBell size={20} />
          {count > 0 && (
            <div className="w-5 h-5 top-1 right-1 absolute bg-red-600 text-white text-xs flex justify-center items-center rounded-full">
              {count}
            </div>
          )}
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <NotificationList />
      </Menu.Dropdown>
    </Menu>
  );
}
