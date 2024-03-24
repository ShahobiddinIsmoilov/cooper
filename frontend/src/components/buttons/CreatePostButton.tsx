import { useDialog } from "../../contexts/DialogContext";
import CreatePostForm from "../../forms/CreatePostForm";

function CreatePostButton() {
  const { setDialogContent, setIsDialogVisible } = useDialog();

  function handleClick() {
    setDialogContent(<CreatePostForm />);
    setIsDialogVisible(true);
  }

  return (
    <button
      onClick={handleClick}
      className="text-white rounded-full px-4 py-1 border text-base ml-4 hover:bg-dark-600 h-8"
    >
      + Create Post
    </button>
  );
}

export default CreatePostButton;
