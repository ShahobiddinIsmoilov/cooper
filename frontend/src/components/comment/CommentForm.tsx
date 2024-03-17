import { Box } from "@mui/material";

function CommentForm() {
  return (
    <form>
      <Box className="px-4 pt-6 pb-4">
        <textarea
          placeholder="Add a comment"
          className="text-md w-full text-white rounded-3xl
                  bg-dark-800 border p-4 border-dark-600 placeholder-white
                    placeholder-opacity-50 resize-none"
        />
      </Box>
    </form>
  );
}

export default CommentForm;
