import { Avatar, Modal, Stack, Text, Group, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import FancyTextEditor from "../../forms/post/FancyTextEditor";
import CommunityCombobox from "../../forms/post/CommunityCombobox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import PostTitle from "../../forms/post/PostTitle";
import useCredentials from "../../services/useCredentials";
import { useNavigate } from "react-router-dom";

interface CreatePostButtonProps {
  com?: string; // initial value of the community
}

export default function CreatePostButton({ com }: CreatePostButtonProps) {
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
  const [community, setCommunity] = useState<string | undefined>(com);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [HTMLbody, setHTMLbody] = useState({});
  const [formDisabled, setFormDisabled] = useState(false);

  // modal state
  const [opened, { open, close }] = useDisclosure();

  async function handleSubmit() {
    const newPost = {
      username: username,
      community: community,
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
    setCommunity(com);
    setTitle("");
    setBody("");
    setFormDisabled(false);
  }

  const newPostForm = useForm({});

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
        <form onSubmit={newPostForm.onSubmit(() => handleSubmit())}>
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
                community={community}
                setCommunity={setCommunity}
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
