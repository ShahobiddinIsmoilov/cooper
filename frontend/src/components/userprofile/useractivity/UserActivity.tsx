import { useQueryClient } from "@tanstack/react-query";
import UserActivityList from "./UserActivityList";
import { Group, Select } from "@mantine/core";
import { useState } from "react";
import Line from "../../../utils/Line";

export default function UserActivity() {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();

  return (
    <>
      <Group className="pb-3">
        <span>SORT BY:</span>
        <Select
          w={100}
          data={["NEW", "TOP"]}
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
