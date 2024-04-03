import { Flex, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import UserNavbarItem from "./UserNavbarItem";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function UserNavbar({ active }: { active: string }) {
  const username = useAuthContext().user?.username;

  return (
    <Flex justify="space-between">
      <Group pb={8}>
        <Link to={""}>
          <UserNavbarItem
            username={username}
            value="Activity"
            active={active}
          />
        </Link>
        <Link to={`/profile/posts`}>
          <UserNavbarItem username={username} value="Posts" active={active} />
        </Link>
        <Link to={`/profile/comments`}>
          <UserNavbarItem
            username={username}
            value="Comments"
            active={active}
          />
        </Link>
      </Group>
      <Link to="/profile/settings">
        <UserNavbarItem username={username} value="Settings" active={active} />
      </Link>
    </Flex>
  );
}
