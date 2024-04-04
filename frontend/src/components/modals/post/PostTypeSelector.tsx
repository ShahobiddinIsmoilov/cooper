import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreatePost from "./CreatePost";
import { useState } from "react";

interface Props {
  community: number;
  community_name: string;
  community_link: string;
}

export default function PostTypeSelector({
  community,
  community_name,
  community_link,
}: Props) {
  // modal state
  const [opened, { open, close }] = useDisclosure();
  const [postType, setPostType] = useState("");

  function handleSelect() {}

  return (
    <>
      <CreatePost
        community={community}
        community_name={community_name}
        community_link={community_link}
        opened={opened}
        open={open}
        close={close}
      />
    </>
  );
}
