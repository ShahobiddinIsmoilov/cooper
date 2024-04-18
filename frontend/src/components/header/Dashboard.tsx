import { Flex } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../services/makeRequest";
import ProfileMenu from "./ProfileMenu";
import Notifications from "./notifications/Notifications";

export default function Dashboard({ username }: { username: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
  });

  if (isPending) return null;

  if (error) return null;

  const user = data.data;

  console.log(user);

  return (
    <Flex align="center" gap={8}>
      <button className="p-[10px] flex items-center gap-1 hover:bg-dark-700 border-white border-opacity-25 rounded-full">
        <FaPlus size={20} />
        Create
      </button>
      <Notifications count={user.notifications} />
      <ProfileMenu user={user} />
    </Flex>
  );
}
