// WARNING: HIGHLY UNSTABLE PIECE OF CODE. DO NOT CHANGE IF YOU DON'T KNOW WHAT YOU'RE DOING!!!

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommentProps } from "../interfaces/commentProps";
import { getComments } from "../services/comment/getComments";

export interface CommentContextProps {
  comments: CommentProps[];
  getReplies: (parent: number) => CommentProps[];
  rootComments: {};
  post_id: number;
  post_title: string;
  community: number;
  community_name: string;
  community_link: string;
}

export function useComments() {
  return useContext(CommentContext) as CommentContextProps;
}

const CommentContext = createContext<CommentContextProps | null>(null);

interface CommentProviderProps {
  children: ReactNode;
  post_id: number;
  post_title: string;
  community: number;
  community_name: string;
  community_link: string;
}

interface CommentsByParentProps {
  [parent: number]: CommentProps[];
}

function CommentProvider({
  children,
  post_id,
  post_title,
  community,
  community_name,
  community_link,
}: CommentProviderProps) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    post_id &&
      getComments(`api/comment/post/${post_id}/`).then((response) => {
        setComments(response.data);
      });
  }, []);

  // critical piece of code to get an array of a parent comment
  const commentsByParent = useMemo(() => {
    const group: CommentsByParentProps = {};
    comments.forEach((comment: CommentProps) => {
      group[comment.parent] ||= [];
      group[comment.parent].push(comment);
    });
    return group;
  }, [comments]);

  function getReplies(parent: number) {
    return commentsByParent[parent];
  }

  let contextData = {
    comments: comments,
    getReplies: getReplies,
    rootComments: commentsByParent[0],
    post_id: post_id,
    post_title: post_title,
    community: community,
    community_name: community_name,
    community_link: community_link,
  };

  return (
    <CommentContext.Provider value={contextData}>
      {children}
    </CommentContext.Provider>
  );
}

export default CommentProvider;
