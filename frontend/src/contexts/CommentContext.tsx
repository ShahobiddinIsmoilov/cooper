import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { CommentProps } from "../interfaces/commentProps";
import { getComments } from "../services/comment/getComments";

export interface CommentContextProps {
  comments: CommentProps[];
  getReplies: (parent: number) => CommentProps[];
  rootComments: {};
}

export const CommentContext = createContext<CommentContextProps | null>(null);

interface CommentProviderProps {
  children: ReactNode;
}

interface CommentsByParentProps {
  [parent: number]: CommentProps[];
}

function CommentProvider({ children }: CommentProviderProps) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments("api/comment/list/all/").then((response) => {
      setComments(response.data);
    });
  }, []);

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
  };

  return (
    <CommentContext.Provider value={contextData}>
      {children}
    </CommentContext.Provider>
  );
}

export default CommentProvider;
