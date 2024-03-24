import { CommunityProps } from "../interfaces/communityProps";
import { FaInfoCircle } from "react-icons/fa";

interface InfobarProps {
  community?: CommunityProps;
}

function Infobar({ community }: InfobarProps) {
  return (
    <div className="w-80 min-w-72 text-white overflow-hidden h-fit bg-dark-850 rounded-xl p-8">
      <p className="flex justify-center items-center gap-2 opacity-50">
        <FaInfoCircle className="inline-block" />
        About this community
      </p>
      <p className="pt-4 break-words">
        Smiling mention he in thought equally musical. Wisdom new and valley
        answer. Contented it so is discourse recommend. Man its upon him call
        mile. An pasture he himself believe ferrars besides cottage. Smiling
        mention he in thought equally musical.
      </p>
    </div>
  );
}

export default Infobar;
