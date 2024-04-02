import { Avatar, Flex, Group, Stack } from "@mantine/core";
import UserActivity from "../components/userprofile/useractivity/UserActivity";
import UserPosts from "../components/userprofile/userposts/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Line from "../utils/Line";
import { useState } from "react";

export default function ProfilePage() {
  const { username } = useParams();

  return (
    <Stack p={32} gap={8}>
      <Flex justify={"space-between"} mb={32}>
        <Group>
          <Avatar
            src={`../../../../src/assets/gordon.jpg`}
            radius={16}
            size={150}
          />
          <p className="text-white text-3xl font-bold">{username}</p>
        </Group>
        <Stack>
          {/* <p className="text-white text-3xl font-bold">Socials</p> */}
        </Stack>
      </Flex>
      <ProfilePageTabs username={username} />
      <Line />
      <div className="flex justify-center">
        <div className="xs:p-1 flex-grow max-w-3xl">
          <Routes>
            <Route path="" element={<UserActivity />} />
            <Route path="/posts" element={<UserPosts />} />
            <Route path="/comments" element={<UserComments />} />
          </Routes>
        </div>
      </div>
    </Stack>
  );
}

function ProfilePageTabs({ username }: { username?: string }) {
  const [active, setActive] = useState("activity");

  return (
    <Group justify="center" className="text-xl">
      <Link
        to={`/user/${username}`}
        onClick={() => setActive("activity")}
        className={`py-2 px-4 rounded-full hover:bg-dark-700 ${
          active === "activity" && "bg-dark-700 text-white"
        }`}
      >
        Activity
      </Link>
      <Link
        to={`/user/${username}/posts`}
        onClick={() => setActive("posts")}
        className={`py-2 px-4 rounded-full hover:bg-dark-700 ${
          active === "posts" && "bg-dark-700 text-white"
        }`}
      >
        Posts
      </Link>
      <Link
        to={`/user/${username}/comments`}
        onClick={() => setActive("comments")}
        className={`py-2 px-4 rounded-full hover:bg-dark-700 ${
          active === "comments" && "bg-dark-700 text-white"
        }`}
      >
        Comments
      </Link>
    </Group>
  );
}
