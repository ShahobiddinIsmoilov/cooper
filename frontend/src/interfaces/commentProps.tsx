export interface CommentProps {
  id: number;
  user: number;
  post: number;
  post_title: string;
  parent: number;
  parent_user: number;
  parent_username: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  community: string;
  username: string;
  body: string;
}
