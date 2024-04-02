import { Stack } from "@mantine/core";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import PostList from "./PostList";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";

interface PostFeedProps {
  page: number | "home" | "explore";
}

export default function PostFeed({ page }: PostFeedProps) {
  const [sortOption, setSortOption] = useState("hot");

  return (
    <Stack gap={0} className="xs:p-1 max-w-3xl mt-2">
      <Sortbar
        sortOption={sortOption}
        setSortOption={setSortOption}
        page={page}
      />
      <PostList page={page} sortOption={sortOption} />
    </Stack>
  );
}

interface SortbarProps {
  sortOption: string;
  setSortOption: (value: string) => void;
  page: number | "home" | "explore";
}

function Sortbar({ sortOption, setSortOption, page }: SortbarProps) {
  const { screenWidth } = useWindowSize();
  const query = useQueryClient();

  return screenWidth < 620 ? (
    <div className="flex justify-center gap-2 text-white">
      <p className="opacity-50 px-2 flex items-center text-center">SORT BY:</p>
      {/* <SortbarItem icon="🔥" text="TRENDING" /> */}
    </div>
  ) : (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => {
          query.removeQueries({ queryKey: [`posts-${page}`] });
          setSortOption("hot");
        }}
        className={`text-white text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "hot" && "bg-dark-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaFire className="inline-block" />
          <span>TRENDING</span>
        </div>
      </button>
      <button
        onClick={() => {
          query.removeQueries({ queryKey: [`posts-${page}`] });
          setSortOption("new");
        }}
        className={`text-white text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "new" && "bg-dark-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaRegClock className="inline-block" />
          <span>NEWEST</span>
        </div>
      </button>
      <button
        onClick={() => {
          query.removeQueries({ queryKey: [`posts-${page}`] });
          setSortOption("top");
        }}
        className={`text-white text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "top" && "bg-dark-600"
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
