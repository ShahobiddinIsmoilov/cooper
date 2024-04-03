import { CommentProps } from "../../../interfaces/commentProps";
import { Stack } from "@mantine/core";
import UserCommentCard from "./UserCommentCard";
import Line from "../../../utils/Line";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../../../services/comment/getComments";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function UserCommentList({
  sortOption,
}: {
  sortOption: string;
}) {
  let { username } = useParams();

  if (!username) username = useAuthContext().user?.username;

  const { isPending, error, data } = useQuery({
    queryKey: ["user-comments"],
    queryFn: () =>
      getComments(
        `/api/comment/user/${username}/?sort=${sortOption.toLowerCase()}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const comments = data.data;

  return (
    <Stack gap={0}>
      {comments.map((comment: CommentProps) => (
        <div key={`usercomment-${comment.id}`}>
          <UserCommentCard comment={comment} />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
