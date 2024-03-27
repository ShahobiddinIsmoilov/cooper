import { useQuery } from "@tanstack/react-query";
import PostFeed from "../components/post/PostFeed";
import { useParams } from "react-router-dom";
import getCommunityPosts from "../services/post/getCommunityPosts";
import { ImSpinner4 } from "react-icons/im";
import { IoCloudOffline } from "react-icons/io5";
import { useWindowSize } from "../contexts/WindowSizeContext";
import Infobar from "../components/Infobar";
import CreatePostButton from "../components/buttons/CreatePostButton";

function CommunityPage() {
  const { screenWidth } = useWindowSize();
  const { community_name } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: [`community-page-${community_name}`],
    queryFn: () => getCommunityPosts(community_name!),
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

  const posts = data.data;
  return (
    <>
      <img
        src={`../../../src/assets/${community_name}.png`}
        className="h-24 xs:h-48 bg-white w-[1088px] object-cover rounded-xl"
      />
      <div className="flex">
        <div className="-translate-y-10 xs:-translate-y-14">
          <div className="flex ml-4 xs:ml-8">
            <img
              src={`../../../src/assets/${community_name}.jpg`}
              className="w-24 h-24 xs:w-32 xs:h-32 rounded-full bg-white object-cover border-4 xs:border-8 border-dark-800"
            />
            <div className="flex justify-between items-center mt-10 xs:mt-14 ml-2">
              <p className="text-blue-400 text-lg xs:text-3xl font-bold break-words">
                {community_name}
              </p>
              <button className="text-white rounded-full px-4 py-1 border text-base ml-4 hover:bg-dark-600 h-8">
                Join
              </button>
              <CreatePostButton com={community_name!} />
            </div>
          </div>
          <div className="max-w-3xl xs:px-2">
            <PostFeed posts={posts} />
          </div>
        </div>
        <div className="mt-4">{screenWidth >= 920 && <Infobar />}</div>
      </div>
    </>
  );
}

export default CommunityPage;
