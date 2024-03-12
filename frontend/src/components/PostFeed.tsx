import { Box, Stack, Typography } from "@mui/material";
import Line from "./Line";
import PostCardAll from "./PostCardAll";
import PostCard from "./PostCard";
import { PostProps } from "../pages/HomePage";

interface PostFeedProps {
  posts: PostProps[];
  all?: boolean;
  community?: string;
}

function PostFeed({
  posts,
  all = false,
  community = "everything on shredded",
}: PostFeedProps) {
  return (
    <Box sx={{ alignItems: "center", px: "40px" }}>
      <Stack direction="column" spacing="5px" divider={<Line />}>
        <Box
          sx={{
            p: "10px",
            alignItems: "center",
            backgroundColor: "#E3F2FD",
          }}
        >
          <Typography
            variant="h6"
            className="opacity-50"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {!all && "community"}
          </Typography>
          <Typography
            variant="h4"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {community}
          </Typography>
        </Box>
        {posts.map((post: PostProps) =>
          all ? (
            <PostCardAll key={post.id} post={post} />
          ) : (
            <PostCard key={post.id} post={post} />
          )
        )}
      </Stack>
    </Box>
  );
}

export default PostFeed;
