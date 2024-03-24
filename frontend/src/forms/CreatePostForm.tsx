import { ImSpinner4 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { useDialog } from "../contexts/DialogContext";
import { useState } from "react";
import TextInput from "./elements/TextInput";

function CreatePostForm() {
  const { handleDialogClose, setDialogContent } = useDialog();
  const [showSpinner, setShowSpinner] = useState(false);

  function handleClose() {
    !showSpinner && handleDialogClose();
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setShowSpinner(true);
  }

  return (
    <div className="text-white rounded-xl p-4 xs:p-8 bg-dark-900 shadow-lg shadow-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end gap-4 xs:gap-6"
      >
        <button>
          <IoMdClose
            className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
            onClick={handleClose}
          />
        </button>
        <span className="text-xl xs:text-2xl text-center w-full">
          Create Post
        </span>
        <TextInput
          id="post-title"
          name="post-title"
          charLimit={128}
          autoFocus={true}
          placeholder="Title"
          width={700}
        />
        <TextInput
          id="post-body"
          name="post-body"
          charLimit={4096}
          autoFocus={true}
          placeholder="Text (optional)"
          width={700}
        />
        {showSpinner ? (
          <p className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer text-center bg-cyan-600 w-64 xs:w-80">
            <ImSpinner4 size={20} className="inline-block animate-spin mr-2" />
            Creating your post...
          </p>
        ) : (
          <input
            type="submit"
            value="Create Post"
            className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer bg-cyan-700 hover:bg-cyan-600 w-24 xs:w-32 text-center"
          />
        )}
      </form>
    </div>
  );
}

export default CreatePostForm;
