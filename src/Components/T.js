import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "./Fetch";
const CommentMessagess = () => {
    const { id } = useParams();
    const {
      data: comments,
      pending: pending2,
      error2,
    } = useFetch("http://localhost:8000/getComments/" + id);
    const {
      data: replies,
      pending: pending3,
      error4,
    } = useFetch("http://localhost:8000/getReply");
    const [replyForm, setreplyForm] = useState(false);
    const [CommentId, setCommentId] = useState(null);
    const [formData, setformData] = useState({
      name: "",
      email: "",
      comments: "",
      id: "",
    });
  console.log(comments);
  if (pending2 || pending3) {
    return <p>Loading...</p>;
  }

  if (error2 || error4) {
    return <p>Error: {error2 || error4}</p>;
  }
  console.log(replies);
    // Map comments and replies to an array of nested comments
    const nestedComments = comments.map((comment) => {
      const commentReplies = replies.filter((reply) => reply.CID === comment.id);
      return {
        ...comment,
        replies: commentReplies,
      };
    });
  
    return (
        <div>
          <h3>Hey</h3>
        {pending2 || pending3 ? (
          <p>Loading...</p>
        ) : error2 || error4 ? (
          <p>Error: {error2 || error4}</p>
        ) : (
          <ul>
            {nestedComments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                {comment.replies.length > 0 && (
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply.id}>
                        <p>{reply.reply}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default CommentMessagess;
  