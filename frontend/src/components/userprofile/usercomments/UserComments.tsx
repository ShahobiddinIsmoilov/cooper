import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../services/comment/getComments";
import UserCommentList from "./UserCommentList";
import { useState } from "react";

interface UserCommentsProps {
  username: string;
}

export default function UserComments({ username }: UserCommentsProps) {
  const [sortOption, setSortOption] = useState("NEW");
  console.log(sortOption);

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
    <UserCommentList
      comments={comments}
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  );
}
