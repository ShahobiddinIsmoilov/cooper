import { useParams } from "react-router-dom";
import PostDetail from "../components/post/PostDetail";
import { useQuery } from "@tanstack/react-query";
import getPostDetail from "../services/post/getPostDetail";
import { ImSpinner4 } from "react-icons/im";
import { IoCloudOffline } from "react-icons/io5";
import Infobar from "../components/Infobar";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { Flex } from "@mantine/core";

function PostDetailPage() {
  const { screenWidth } = useWindowSize();
  const { post_id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: [`post-detail-${post_id}`],
    queryFn: () => getPostDetail(Number(post_id)),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center mt-16 text-white text-2xl">
        <ImSpinner4 className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center mt-16 text-white text-xl gap-2">
        <IoCloudOffline />
        Couldn't load data
      </div>
    );

  const post = data.data;

  return (
    <Flex>
      <div className="flex-grow max-w-3xl xs:px-2">
        <PostDetail post={post} />
      </div>
      {screenWidth >= 920 && <Infobar />}
    </Flex>
  );
}

export default PostDetailPage;
