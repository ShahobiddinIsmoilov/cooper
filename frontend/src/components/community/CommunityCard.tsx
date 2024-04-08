import { Link } from "react-router-dom";
import { CommunityProps } from "../../interfaces/communityProps";
import { Avatar } from "@mantine/core";

interface CommunityCardProps {
  community: CommunityProps;
}

function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link to={`/community/${community.name}`}>
      <div className="flex gap-3 items-center px-8 py-4 rounded-xl hover:bg-dark-700">
        <div className="flex items-center min-w-12">
          <Avatar
            src={`../../../../src/assets/avatar_${community.name}.jpg`}
            className="rounded-full h-12 w-12 object-cover"
          />
        </div>
        <div className="truncate">
          <p className="text-lg font-bold">{community.name}</p>
          <p className="text-gray-400 truncate">
            {community.members === 1
              ? "1 member"
              : community.members.toLocaleString() + " members"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CommunityCard;
