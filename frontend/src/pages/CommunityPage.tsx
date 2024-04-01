import { useQuery } from "@tanstack/react-query";
import PostFeed from "../components/post/PostFeed";
import { useParams } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import { IoCloudOffline } from "react-icons/io5";
import { useWindowSize } from "../contexts/WindowSizeContext";
import Infobar from "../components/Infobar";
import CreatePostButton from "../components/modals/post/CreatePostButton";
import { Avatar, Image } from "@mantine/core";
import getCommunityDetail from "../services/community/getCommunityDetail";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";

function CommunityPage() {
  const { screenWidth } = useWindowSize();
  const { community_name } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: [`community-page-${community_name}`],
    queryFn: () => getCommunityDetail(community_name!),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center mt-16 text-white text-2xl">
        <ImSpinner4 className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center mt-16 text-white gap-2">
        <IoCloudOffline />
        Couldn't load data
      </div>
    );

  const community: CommunityDetailProps = data.data;

  return (
    <>
      <Image
        src={`../../../src/assets/banner_${community_name}.jpg`}
        className="h-24 xs:h-48 bg-white w-[1088px] object-cover rounded-xl"
      />
      <div className="flex">
        <div className="flex-grow -translate-y-10 xs:-translate-y-14">
          <div className="flex ml-4 xs:ml-8">
            <Avatar
              src={`../../../src/assets/avatar_${community_name}.jpg`}
              className="w-24 h-24 xs:w-32 xs:h-32 rounded-full object-cover border-4 xs:border-8 border-dark-800"
            />
            <div className="flex justify-between items-center mt-10 xs:mt-14 ml-2">
              <p className="text-blue-400 text-lg xs:text-3xl font-bold break-words">
                {community_name}
              </p>
              <button className="text-white rounded-full px-4 py-1 border text-base ml-4 hover:bg-dark-600 h-8">
                Join
              </button>
              <CreatePostButton
                community={community.id}
                community_name={community.name}
                community_link={community.link}
              />
            </div>
          </div>
          <PostFeed page={community.id} />
        </div>
        <div className="mt-4">
          {screenWidth >= 920 && <Infobar community={community} />}
        </div>
      </div>
    </>
  );
}

export default CommunityPage;
