import { useQuery } from "@tanstack/react-query";
import createPost from "../../services/post/createPost";

interface CreatePostProps {
  postData: {};
}

export default function CreatePost({ postData }: CreatePostProps) {
  const { isPending, error, data } = useQuery({
    queryKey: [""],
    queryFn: () => createPost(postData),
  });

  if (isPending) return "Loading";

  if (error) return "Error";
}
