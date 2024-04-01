import { useQuery } from "@tanstack/react-query";
import UserPostList from "./UserPostList";
import getUserPosts from "../../services/post/getUserPosts";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function UserPosts() {
  const { username } = useParams();
  const [sortOption, setSortOption] = useState("NEW");

  const { isPending, error, data } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () =>
      getUserPosts(
        `/api/post/list/user/${username}/?sort=${sortOption.toLowerCase()}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return (
    <UserPostList
      posts={posts}
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  );
}
