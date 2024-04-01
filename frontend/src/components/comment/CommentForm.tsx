import { useState } from "react";
import FancyCommentEditor from "./FancyCommentEditor";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import useCredentials from "../../services/useCredentials";
import { useComments } from "../../contexts/CommentContext";

interface CommentFormProps {
  post: number;
  parent: number;
  parent_username?: string;
  placeholder?: string;
  setShowReply?: (value: boolean) => void;
  autofocus?: boolean;
}

function CommentForm({
  post,
  parent,
  parent_username,
  placeholder,
  autofocus,
  setShowReply,
}: CommentFormProps) {
  const username = useAuthContext().user?.username;
  const { community, community_name, community_link, post_title } =
    useComments();
  const [HTMLComment, setHTMLComment] = useState("");
  const [controlsVisible, setControlsVisible] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [clearForm, setClearForm] = useState(false);

  const api = useCredentials();

  const mutatation = useMutation({
    mutationFn: (newComment: {}) =>
      api.post("/api/comment/create/", newComment),
    onSuccess: () => {
      handleCancel();
    },
  });

  function handleCancel() {
    setControlsVisible(false);
    setToolbarVisible(false);
    setHTMLComment("");
    setClearForm(true);
    setShowReply && setShowReply(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setFormDisabled(true);
    const newComment = {
      post: post,
      post_title: post_title,
      community: community,
      community_name: community_name,
      community_link: community_link,
      username: username,
      parent: parent,
      parent_username: parent_username,
      body: HTMLComment,
    };
    mutatation.mutate(newComment);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Stack gap={4} className="py-2 xs:py-6">
        <FancyCommentEditor
          setHTMLComment={setHTMLComment}
          formDisabled={formDisabled}
          setControlsVisible={setControlsVisible}
          toolbarVisible={toolbarVisible}
          clearForm={clearForm}
          placeholder={placeholder}
          autofocus={autofocus}
          setClearForm={setClearForm}
        />
        {controlsVisible && (
          <div className="flex justify-between">
            <Button
              className="text-blue-400 hover:text-blue-300 hover:bg-transparent h-8 rounded-full px-2"
              onClick={() => setToolbarVisible(!toolbarVisible)}
            >
              Formatting options
            </Button>
            <span>
              <Button
                className="hover:bg-dark-700 h-8 w-16 rounded-full p-0 mr-2 opacity-50 hover:opacity-100"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-cyan-700 hover:bg-cyan-600 h-8 w-16 rounded-full p-0"
              >
                Post
              </Button>
            </span>
          </div>
        )}
      </Stack>
    </form>
  );
}

export default CommentForm;
