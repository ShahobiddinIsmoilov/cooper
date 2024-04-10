import { Avatar, Flex, Group, Stack } from "@mantine/core";
import UserActivity from "../components/userprofile/useractivity/UserActivity";
import UserPosts from "../components/userprofile/userposts/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Line from "../utils/Line";
import UserNavbar from "../components/userprofile/usernavbar/UserNavbar";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function UserPage() {
  const username = useParams().username;
  const user = useAuthContext().user;
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const pattern_posts = /^\/user\/[^\/]+\/posts$/;
  const pattern_comments = /^\/user\/[^\/]+\/comments$/;
  const pattern_saved = /^\/user\/[^\/]+\/saved$/;
  const pattern_liked = /^\/user\/[^\/]+\/liked$/;
  const pattern_disliked = /^\/user\/[^\/]+\/disliked$/;

  useEffect(() => {
    if (username === user?.username) {
      if (pattern_posts.test(path)) navigate("/profile/posts");
      else if (pattern_comments.test(path)) navigate("/profile/comments");
      else if (pattern_saved.test(path)) navigate("/profile/saved");
      else if (pattern_liked.test(path)) navigate("/profile/liked");
      else if (pattern_disliked.test(path)) navigate("/profile/disliked");
      else navigate("/profile");
    } else if (
      pattern_saved.test(path) ||
      pattern_liked.test(path) ||
      pattern_disliked.test(path)
    )
      navigate(`/user/${username}`);
  }, []);

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
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </div>
    </Stack>
  );
}
