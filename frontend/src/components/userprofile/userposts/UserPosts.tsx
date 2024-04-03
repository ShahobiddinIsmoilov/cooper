import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Group, Select } from "@mantine/core";
import Line from "../../../utils/Line";
import UserPostList from "./UserPostList";

interface Props {
  setActive: (value: string) => void;
}

export default function UserPosts({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();

  useEffect(() => {
    setActive("posts");
  }, []);

  return (
    <>
      <Group className="pb-3">
        <span>SORT BY:</span>
        <Select
          w={100}
          data={["NEW", "TOP"]}
          value={sortOption}
          onOptionSubmit={(value) => {
            query.removeQueries({ queryKey: ["user-posts"] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserPostList sortOption={sortOption} />
    </>
  );
}
