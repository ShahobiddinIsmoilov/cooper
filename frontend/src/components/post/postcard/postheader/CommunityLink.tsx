import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCommunityDetail from "../../../../services/community/getCommunityDetail";
import { ImSpinner4 } from "react-icons/im";
import uzb from "../../../../assets/uzb.png";

interface CommunityLinkProps {
  community: string;
}

function CommunityLink({ community }: CommunityLinkProps) {
  const [showPreview, setShowPreview] = useState(false);

  let showPreviewTimer: NodeJS.Timeout;
  let hidePreviewTimer: NodeJS.Timeout;

  function handleMouseEnter() {
    clearTimeout(hidePreviewTimer);
    showPreviewTimer = setTimeout(() => {
      setShowPreview(true);
    }, 750);
  }

  function handleMouseLeave() {
    clearTimeout(showPreviewTimer);
    hidePreviewTimer = setTimeout(() => {
      setShowPreview(false);
    }, 250);
  }

  return (
    <div className="flex gap-1">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link to={`/community/${community}`}>
          <span className="font-bold hover:underline  text-blue-400">
            {community}
          </span>
        </Link>
        {showPreview && <Preview community={community} />}
      </div>
      <span className="opacity-50"> ∙ 3h ago</span>
    </div>
  );
}

export default CommunityLink;

interface CommunityDetailProps {
  name: string;
  title: string;
  description: string;
  members: number;
}

function Preview({ community }: CommunityLinkProps) {
  const [loading, setLoading] = useState(true);
  const [communityDetail, setCommunityDetail] =
    useState<CommunityDetailProps | null>(null);

  useEffect(() => {
    getCommunityDetail(community)
      .then((response) => {
        setLoading(false);
        setCommunityDetail(response.data);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
      {loading ? (
        <div className="flex justify-center items-center w-48 h-48">
          <ImSpinner4 className="animate-spin text-xl opacity-50" />
        </div>
      ) : communityDetail ? (
        <CommunityPreview communityDetail={communityDetail} />
      ) : (
        <div className="flex justify-center items-center w-48 h-48 opacity-50">
          Something went wrong
        </div>
      )}
    </div>
  );
}

interface CommunityPreviewProps {
  communityDetail: CommunityDetailProps;
}

function CommunityPreview({ communityDetail }: CommunityPreviewProps) {
  return (
    <div className="w-96">
      <img src={uzb} className="bg-blue-400 w-96 object-cover" />
      <div className="flex items-center gap-2 m-4">
        <img
          src={`../../../../src/assets/${communityDetail.name}.jpg`}
          className="w-10 xs:w-14 h-10 xs:h-14 min-w-10 xs:min-w-14 object-cover rounded-full"
        />
        <div className="mx-1 w-full">
          <div className="flex justify-between">
            <Link
              to={`/community/${communityDetail.name}`}
              className="text-xl text-blue-500 hover:text-blue-400 font-bold max-w-[180px] overflow-hidden"
            >
              {communityDetail.name}
            </Link>
            <button className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-full px-3 max-h-10 text-nowrap">
              A'zo bo'lish
            </button>
          </div>
          <p className="opacity-50">
            {communityDetail.members.toLocaleString()} ta a'zo
          </p>
        </div>
      </div>
      <p className="m-6 opacity-75">{communityDetail.description} </p>
    </div>
  );
}
