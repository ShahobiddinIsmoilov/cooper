import { Box } from "@mui/material";

function CommentPost() {
  return (
    <Box>
      <Box className="px-4 pt-6 pb-4">
        <input
          type="text"
          placeholder="Add a comment"
          className="text-md w-full h-10 text-white rounded-full
                  bg-dark-800 border p-4 border-dark-600 placeholder-white
                    placeholder-opacity-50"
        />
      </Box>
    </Box>
  );
}

export default CommentPost;
