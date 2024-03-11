import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PostProps } from "../pages/HomePage";

interface PostCardProps {
  post: PostProps;
}

function PostCard({ post }: PostCardProps) {
  return (
    <Box
      key={post.id}
      sx={{
        backgroundColor: "#f2f2f2",
        "&:hover": { backgroundColor: "#E3F2FD" },
      }}
    >
      <Box className="text-lg px-5 py-2">
        <span className="opacity-75">from </span>
        <Link to={`/community/${post.community}`}>
          <span className="font-bold hover:underline">{post.community}</span>
        </Link>
        <Link to="/">
          <span> • 3h ago</span>
        </Link>
      </Box>

      <Link to={post.url}>
        <Typography
          className="px-5 py-2"
          sx={{ fontWeight: "bold", fontSize: 25 }}
        >
          {post.title}
        </Typography>
        <Typography variant="h6" className="px-5 py-2">
          {post.body}
        </Typography>
      </Link>
      <Box
        className="px-5 py-2"
        sx={{
          fontSize: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span className="flex items-center space-x-2">
          <span className="hover:text-green-700 cursor-pointer rounded-full">
            △
          </span>
          <span
            className={
              post.votes > 0
                ? "text-green-700 text-xl font-bold"
                : "text-red-700 text-xl font-bold"
            }
          >
            {post.votes > 0 ? "+" + String(post.votes) : post.votes}
          </span>
          <span className="hover:text-red-700 cursor-pointer">▽</span>
        </span>
        <Link to={post.url}>
          <span className="text-xl pr-2 font-bold hover:underline">
            {post.comments} comments
          </span>
        </Link>
      </Box>
    </Box>
  );
}

export default PostCard;
