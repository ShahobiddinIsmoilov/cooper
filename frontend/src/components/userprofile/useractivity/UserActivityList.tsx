import { Stack } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import { PostProps } from "../../../interfaces/postProps";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import UserCommentCard from "../usercomments/UserCommentCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getUserActivity from "../../../services/getUserActivity";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function UserActivityList({
  sortOption,
}: {
  sortOption: string;
}) {
  let { username } = useParams();

  if (!username) username = useAuthContext().user?.username;

  const { isPending, error, data } = useQuery({
    queryKey: ["user-activity"],
    queryFn: () =>
      getUserActivity(
        `/api/comment/useractivity/${username}/?sort=${sortOption.toLowerCase()}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const list = data.data;

  return (
    <Stack gap={0}>
      {list.map((item: CommentProps | PostProps) =>
        "title" in item ? (
          <div key={`useractivity-post-${item.id}`}>
            <PostCard post={item} notCommunity={true} />
            <Line />
          </div>
        ) : (
          <div key={`useractivity-comment-${item.id}`}>
            <UserCommentCard comment={item} />
            <Line />
          </div>
        )
      )}
    </Stack>
  );
}
