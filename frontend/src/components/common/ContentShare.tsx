import { FiLink } from "react-icons/fi";

interface Props {
  content: "post" | "comment";
  bg: string;
}

export default function ContentShare({ bg }: Props) {
  return (
    <button
      className={`text-sm xs:text-base rounded-full p-[11px] cursor-pointer text-white/50 hover:text-white h-fit hover:bg-dark-${bg}`}
    >
      <FiLink />
    </button>
  );
}
