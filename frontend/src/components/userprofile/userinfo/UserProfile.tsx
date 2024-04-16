import { Avatar, Flex, Stack } from "@mantine/core";
import { BiSolidLike } from "react-icons/bi";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import SocialIcons from "./SocialIcons";

interface Props {
  user: UserDetailProps;
}

export default function UserProfile({ user }: Props) {
  return (
    <Flex justify={"space-between"} mb={32}>
      <Flex align="center" gap={12}>
        <Avatar
          src={`../../../../src/assets/gordon.jpg`}
          radius={16}
          size={150}
        />
        <div>
          <p className="text-white text-3xl font-bold break-words">
            {user.display_name}
          </p>
          <p className="text-orange-400 text-xl font-bold">{user.username}</p>
          <SocialIcons />
        </div>
      </Flex>
      <Stack w={200} miw={200} justify="center" align="end">
        <div className="text-end">
          <p className="opacity-75">Date joined:</p>
          <p className="text-white text-lg">12-aprel, 2024</p>
        </div>
        <div className="text-end">
          <p className="opacity-75">Likes:</p>
          <p className="text-lg">
            <BiSolidLike className="text-yellow-400 inline-block mr-1" />
            {user.votes.toLocaleString()}
          </p>
        </div>
      </Stack>
    </Flex>
  );
}
