import { CommunityProps } from "./community/CommunityList";

interface InfobarProps {
  community?: CommunityProps;
}

function Infobar({ community }: InfobarProps) {
  return (
    <div
      className="flex-col w-80 min-w-80 text-white overflow-hidden
                bg-dark-850 h-screen"
    ></div>
  );
}

export default Infobar;
