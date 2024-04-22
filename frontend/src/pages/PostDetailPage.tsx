import { useParams } from "react-router-dom";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { ImSpinner4 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { IoCloudOffline } from "react-icons/io5";
import { Flex } from "@mantine/core";
import { PostProps } from "../interfaces/postProps";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import PostDetail from "../components/post/PostDetail";
import getPostDetail from "../services/post/getPostDetail";
import Infobar from "../components/Infobar";

export default function PostDetailPage() {
  const { screenWidth } = useWindowSize();
  const { post_id } = useParams();
  const { community_link } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: [`post-detail-${post_id}`],
    queryFn: () => getPostDetail(post_id!),
    retry: 2,
  });

  if (isPending)
    return (
      <div className="mt-24 flex justify-center items-center text-white text-2xl">
        <ImSpinner4 className="animate-spin" />
      </div>
    );

  if (error) {
    return (
      <div className="mt-24 flex justify-center items-center text-white text-xl gap-2">
        <IoCloudOffline />
        Couldn't load data
      </div>
    );
  }

  const post: PostProps = data.data.post_detail;
  const community: CommunityDetailProps = data.data.community_detail;

  if (community_link !== community.link)
    history.replaceState(null, "", `/c/${community.link}/post/${post_id}`);

  return (
    <Flex>
      <div className="flex-grow max-w-3xl xs:px-2">
        <PostDetail
          post={post}
          community={community.id}
          community_name={community.name}
          community_link={community.link}
        />
      </div>
      {screenWidth >= 920 && <Infobar community={data.data.community_detail} />}
    </Flex>
  );
}
