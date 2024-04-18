import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../services/makeRequest";
import { useAuthContext } from "../../../contexts/AuthContext";
import { NotifProps } from "../../../interfaces/notificationProps";
import { BiCheckDouble } from "react-icons/bi";
import NotificationCard from "./NotificationCard";

export default function NotificationList() {
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      makeRequest(`/api/inbox/list/?filter=user&parent_user=${user}`),
  });

  if (isPending) return "Loading...";

  if (error) return "Error";

  const notifs = data.data;

  return (
    <Stack gap={0} className="my-1 max-h-96 overflow-y-scroll">
      <div className="flex justify-end">
        <button className="font-bold text-sm rounded-full px-3 py-1 hover:bg-dark-700 flex items-center gap-1 text-yellow-400">
          <BiCheckDouble size={22} />
          Mark all as read
        </button>
      </div>
      {notifs.map((item: NotifProps) => (
        <div key={item.id}>
          <NotificationCard notif={item} />
        </div>
      ))}
    </Stack>
  );
}
