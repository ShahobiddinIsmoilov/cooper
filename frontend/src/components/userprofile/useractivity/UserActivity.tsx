import { useQueryClient } from "@tanstack/react-query";
import UserActivityList from "./UserActivityList";
import { Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import Line from "../../../utils/Line";

interface Props {
  setActive: (value: string) => void;
}

export default function UserActivity({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();

  useEffect(() => {
    setActive("activity");
  }, []);

  return (
    <>
      <Group className="pb-3">
        <span>SORT BY:</span>
        <Select
          w={100}
          data={["NEW", "TOP", "BEST"]}
          value={sortOption}
          onOptionSubmit={(value) => {
            query.removeQueries({ queryKey: ["user-activity"] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserActivityList sortOption={sortOption} />
    </>
  );
}
