import { Avatar } from "@mantine/core";
import { NotifProps } from "../../../interfaces/notificationProps";
import { BiCheckDouble } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";

interface Props {
  notif: NotifProps;
}

export default function NotificationCard({ notif }: Props) {
  const [isRead, setIsRead] = useState(notif.is_read);

  function handleMarkRead() {
    setIsRead(true);
  }

  return (
    <>
      <div
        className={`flex justify-between gap-2 px-2 py-3 rounded-xl ${
          !isRead && "bg-dark-850"
        }`}
      >
        <Link
          to={`/community/${notif.community_link}/post/${notif.parent_post}`}
          className="flex gap-2"
        >
          <Avatar src={`../../../../src/assets/media/${notif.user_avatar}`} />
          <div className="text-sm">
            <p className="font-bold">
              <span className="text-orange-400">{notif.username}</span> replied
              to your {notif.parent_comment === 0 ? "post" : "comment"} in{" "}
              <span className="text-blue-400">{notif.community_name}</span>
              <span className="text-white/50 font-normal"> ∙ 8 soat oldin</span>
            </p>
            <p className="text-white">{ReactHtmlParser(notif.comment_body)}</p>
          </div>
        </Link>
        {!isRead && (
          <div className="flex items-center">
            <button
              onClick={handleMarkRead}
              className="hover:bg-dark-700 text-xl text-yellow-400 rounded-full p-2"
            >
              <BiCheckDouble />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
