import { Stack } from "@mantine/core";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import PostList from "./PostList";

interface Props {
  filter: "home" | "explore" | "all" | "community";
  community?: number;
  user?: number;
}

export default function PostFeed({ filter, community, user }: Props) {
  const [sortOption, setSortOption] = useState("hot");

  return (
    <Stack gap={0} className="xs:p-1 max-w-3xl mt-2">
      <Sortbar
        sortOption={sortOption}
        setSortOption={setSortOption}
        filter={filter}
        community={community}
      />
      <PostList
        filter={filter}
        sortOption={sortOption}
        community={community}
        user={user}
      />
    </Stack>
  );
}

interface SortbarProps {
  sortOption: string;
  setSortOption: (value: string) => void;
  filter: "home" | "explore" | "all" | "community";
  community?: number;
}

function Sortbar({
  sortOption,
  setSortOption,
  filter,
  community,
}: SortbarProps) {
  const { screenWidth } = useWindowSize();
  const query = useQueryClient();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return screenWidth < 620 ? (
    <div className="flex justify-center gap-2 text-white">
      <p className="opacity-50 px-2 flex items-center text-center">SORT BY:</p>
      {/* <SortbarItem icon="🔥" text="TRENDING" /> */}
    </div>
  ) : (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => {
          query.removeQueries({
            queryKey: [`posts-${filter}${community && "-" + community}`],
          });
          // navigate(`${path}/?sort=hot`);
          setSortOption("hot");
        }}
        className={`text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "hot" && "bg-dark-700 text-orange-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaFire className="inline-block" />
          <span>TRENDING</span>
        </div>
      </button>
      <button
        onClick={() => {
          query.removeQueries({
            queryKey: [`posts-${filter}${community && "-" + community}`],
          });
          // navigate(`${path}/?sort=new`);
          setSortOption("new");
        }}
        className={`text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "new" && "bg-dark-700 text-orange-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaRegClock className="inline-block" />
          <span>NEWEST</span>
        </div>
      </button>
      <button
        onClick={() => {
          query.removeQueries({
            queryKey: [`posts-${filter}${community && "-" + community}`],
          });
          // navigate(`${path}/?sort=top`);
          setSortOption("top");
        }}
        className={`text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "top" && "bg-dark-700 text-orange-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaRocket className="inline-block" />
          <span>TOP</span>
        </div>
      </button>
    </div>
  );
}
