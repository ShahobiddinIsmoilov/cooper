import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Avatar, Flex, Group, Stack } from "@mantine/core";
import { useAuthContext } from "../contexts/AuthContext";
import Line from "../utils/Line";
import MyUserNavbar from "../components/userprofile/usernavbar/MyUserNavbar";
import UserActivity from "../components/userprofile/useractivity/UserActivity";
import UserPosts from "../components/userprofile/userposts/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import UserSettings from "../components/userprofile/usersettings/UserSettings";
import UserSaved from "../components/userprofile/usersaved/UserSaved";
import UserUpvoted from "../components/userprofile/userupvoted/UserUpvoted";
import UserDownvoted from "../components/userprofile/userdownvoted/UserDownvoted";

export default function ProfilePage() {
  const username = useAuthContext().user?.username;
  const navigate = useNavigate();

  !username && navigate("/");

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
      <MyUserNavbar active={active} />
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
            <Route
              path="/saved"
              element={<UserSaved setActive={setActive} />}
            />
            <Route
              path="/liked"
              element={<UserUpvoted setActive={setActive} />}
            />
            <Route
              path="/disliked"
              element={<UserDownvoted setActive={setActive} />}
            />
            <Route
              path="/settings"
              element={<UserSettings setActive={setActive} />}
            />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </div>
    </Stack>
  );
}
