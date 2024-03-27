import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useComments } from "../../contexts/CommentContext";

export default function CommentFeed() {
  const { getReplies, post_id } = useComments();
  const rootComments = getReplies(0);

  return (
    <div className="mb-12">
      <CommentForm post={post_id} parent={0} placeholder="Add a comment" />
      {rootComments != null && rootComments.length > 0 ? (
        <CommentList comments={rootComments} />
      ) : (
        <p className="text-white opacity-25 text-center text-lg">
          No comments here yet
        </p>
      )}
    </div>
  );
}
