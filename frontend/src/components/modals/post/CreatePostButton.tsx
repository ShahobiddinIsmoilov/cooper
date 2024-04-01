import { Avatar, Modal, Stack, Text, Group, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FancyTextEditor from "./FancyTextEditor";
import CommunityCombobox from "./CommunityCombobox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useState } from "react";
import PostTitle from "./PostTitle";
import useCredentials from "../../../services/useCredentials";
import { useNavigate } from "react-router-dom";

interface CreatePostButtonProps {
  community: number;
  community_name: string;
  community_link: string;
}

export default function CreatePostButton({
  community,
  community_name,
  community_link,
}: CreatePostButtonProps) {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newPost: {}) => api.post("/api/post/create/", newPost),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: [`community-page-${community}`],
      });
      closeModal();
      setFormDisabled(false);
      navigate(`/community/${community}/post/${response.data}`);
    },
  });

  // initial values of form fields
  const username = useAuthContext().user?.username;
  const [combobox, setCombobox] = useState<string | undefined>(community_name);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [HTMLbody, setHTMLbody] = useState({});
  const [formDisabled, setFormDisabled] = useState(false);

  // modal state
  const [opened, { open, close }] = useDisclosure();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newPost = {
      username: username,
      community: community,
      community_name: community_name,
      community_link: community_link,
      title: title,
      body: HTMLbody,
    };
    setFormDisabled(true);
    console.log(newPost);
    mutation.mutate(newPost);
  }

  // close modal and reset form values
  function closeModal() {
    close();
    setCombobox(community_name);
    setTitle("");
    setBody("");
    setFormDisabled(false);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius={12}
        size="xl"
        shadow="xs"
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack gap="lg" pt="md" px="md">
            <Flex className="justify-between items-center">
              <Group>
                <Avatar
                  src={`../../../../src/Assets/gordon.jpg`}
                  size={48}
                  maw={48}
                />
                <Text className="text-xl font-bold">New Post</Text>
              </Group>
              <CommunityCombobox
                community={combobox}
                setCommunity={setCombobox}
              />
            </Flex>
            <PostTitle
              title={title}
              setTitle={setTitle}
              formDisabled={formDisabled}
            />
            <FancyTextEditor
              content={body}
              setContent={setBody}
              setHTMLbody={setHTMLbody}
              formDisabled={formDisabled}
            />
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={closeModal}
                size="md"
                className="rounded-xl w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="md"
                className="bg-cyan-700 hover:bg-cyan-600 rounded-xl w-32"
              >
                Create Post
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <button
        onClick={open}
        className="text-white rounded-full px-4 py-1 border text-base ml-4 hover:bg-dark-600 h-8"
      >
        + Create Post
      </button>
    </>
  );
}
