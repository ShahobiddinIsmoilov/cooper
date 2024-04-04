import { Menu, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { GrTextAlignLeft } from "react-icons/gr";
import { FiLink } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";
import useCredentials from "../../../services/useCredentials";
import CreatePostForm from "./CreatePostForm";
import { FileWithPath } from "@mantine/dropzone";

interface Props {
  community: number;
  community_name: string;
  community_link: string;
}

export default function CreatePostButton(props: Props) {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newPost: {}) => api.post("/api/post/create/", newPost),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: [`community-page-${props.community}`],
      });
      closeModal();
      setFormDisabled(false);
      navigate(`/community/${props.community}/post/${response.data}`);
    },
  });

  // modal state
  const [opened, { open, close }] = useDisclosure();

  // initial values of form fields
  const username = useAuthContext().user?.username;
  const [combobox, setCombobox] = useState<string | undefined>(
    props.community_name
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [HTMLbody, setHTMLbody] = useState({});
  const [formDisabled, setFormDisabled] = useState(false);
  const [postType, setPostType] = useState("");
  const [image, setImage] = useState<FileWithPath | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newPost = {
      username: username,
      community: props.community,
      community_name: props.community_name,
      community_link: props.community_link,
      title: title,
      body: HTMLbody,
      image: image,
      type: postType,
    };
    setFormDisabled(true);
    mutation.mutate(newPost);
  }

  // close modal and reset form values
  function closeModal() {
    close();
    setCombobox(props.community_name);
    setTitle("");
    setBody("");
    setImage(null);
    setFormDisabled(false);
  }

  return (
    <>
      <Menu radius={12}>
        <Menu.Target>
          <button className="text-white rounded-full px-4 py-1 border text-base ml-4 hover:bg-dark-600 h-8">
            + Create Post
          </button>
        </Menu.Target>
        <Menu.Dropdown w={150}>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("text");
              open();
            }}
          >
            <div className="flex items-center gap-4 text-xl hover:bg-dark-700 p-2 rounded-xl font-bold">
              <GrTextAlignLeft size={24} />
              <span>Text</span>
            </div>
          </Menu.Item>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("image");
              open();
            }}
          >
            <div className="flex items-center gap-4 text-xl hover:bg-dark-700 p-2 rounded-xl font-bold">
              <FaRegImage size={24} />
              <span>Image</span>
            </div>
          </Menu.Item>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("link");
              open();
            }}
          >
            <div className="flex items-center gap-4 text-xl hover:bg-dark-700 p-2 rounded-xl font-bold">
              <FiLink size={24} />
              <span>Link</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
        <CreatePostForm
          postType={postType}
          combobox={combobox}
          title={title}
          body={body}
          formDisabled={formDisabled}
          setTitle={setTitle}
          setBody={setBody}
          setHTMLbody={setHTMLbody}
          setCombobox={setCombobox}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          image={image}
          setImage={setImage}
        />
      </Modal>
    </>
  );
}
