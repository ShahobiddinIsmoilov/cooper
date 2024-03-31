import { CommentProps } from "../../../interfaces/commentProps";
import { Group, Select, Stack } from "@mantine/core";
import UserCommentCard from "./UserCommentCard";
import Line from "../../../utils/Line";
import { useQueryClient } from "@tanstack/react-query";

interface CommentListProps {
  comments: CommentProps[];
  sortOption: string;
  setSortOption: (value: string) => void;
}

export default function UserCommentList({
  comments,
  sortOption,
  setSortOption,
}: CommentListProps) {
  const query = useQueryClient();

  return (
    <Stack gap={0} className="xs:p-1 w-[768px] min-w-3xl max-w-3xl">
      <Group className="p-2 pb-3">
        <span>SORT BY:</span>
        <Select
          w={100}
          data={["NEW", "TOP"]}
          value={sortOption}
          onOptionSubmit={(value) => {
            query.removeQueries({ queryKey: ["user-comments"] });
            setSortOption(value);
            console.log(value);
          }}
        />
      </Group>
      <Line />
      {comments?.length > 0 &&
        comments.map((comment: CommentProps) => {
          return (
            <div key={comment.id}>
              <UserCommentCard comment={comment} />
              <Line />
            </div>
          );
        })}
    </Stack>
  );
}
