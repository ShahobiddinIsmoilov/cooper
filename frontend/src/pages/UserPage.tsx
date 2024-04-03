import { Avatar, Flex, Group, Stack } from "@mantine/core";
import UserActivity from "../components/userprofile/useractivity/UserActivity";
import UserPosts from "../components/userprofile/userposts/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Line from "../utils/Line";
import UserNavbar from "../components/userprofile/usernavbar/UserNavbar";
import { useAuthContext } from "../contexts/AuthContext";
import { useLayoutEffect, useState } from "react";

export default function UserPage() {
  const username = useParams().username;
  const user = useAuthContext().user;
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const pattern_activity = /^\/user\/[^\/]+$/;
  const pattern_posts = /^\/user\/[^\/]+\/posts$/;
  const pattern_comemnts = /^\/user\/[^\/]+\/comments$/;

  useLayoutEffect(() => {
    if (username === user?.username) {
      if (pattern_activity.test(path)) navigate("/profile");
      else if (pattern_posts.test(path)) navigate("/profile/posts");
      else if (pattern_comemnts.test(path)) navigate("/profile/comments");
    }
  });

  const [active, setActive] = useState("activity");

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
      <UserNavbar active={active} />
      <Line />
      <div className="flex justify-center">
        <div className="xs:p-1 flex-grow max-w-3xl">
          <Routes>
            <Route path="" element={<UserActivity setActive={setActive} />} />
            <Route
              path="/posts"
              element={<UserPosts setActive={setActive} />}
            />
            <Route
              path="/comments"
              element={<UserComments setActive={setActive} />}
            />
          </Routes>
        </div>
      </div>
    </Stack>
  );
}
