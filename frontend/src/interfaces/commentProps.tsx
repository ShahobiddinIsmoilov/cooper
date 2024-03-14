export interface CommentProps {
  id: number;
  user: number;
  post: number;
  parent: number;
  upvotes: number;
  downvotes: number;
  created_at: string;
  community: string;
  username: string;
  body: string;
}
