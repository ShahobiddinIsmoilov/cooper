import { Avatar, Group, Stack, Tabs } from "@mantine/core";
import UserActivity from "../components/userprofile/UserActivity";
import UserPosts from "../components/userprofile/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("comments");

  return (
    <Stack p={0}>
      <Group p={32}>
        <Avatar radius={16} size={150} />
        <p className="text-white text-3xl font-bold">predator</p>
      </Group>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value!)}>
        <Tabs.List justify="center">
          <Tabs.Tab value="activity" className="hover:bg-dark-850 text-xl">
            Activity
          </Tabs.Tab>
          <Tabs.Tab value="posts" className="hover:bg-dark-850 text-xl">
            Posts
          </Tabs.Tab>
          <Tabs.Tab value="comments" className="hover:bg-dark-850  text-xl">
            Comments
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="activity">
          <UserActivity />
        </Tabs.Panel>
        <Tabs.Panel value="posts">
          <div className="flex justify-center">
            <UserPosts />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="comments">
          <div className="flex justify-center">
            {username && <UserComments username={username} />}
          </div>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
