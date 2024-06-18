import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ConvertDate } from "../utils/convertDate";
import { deleteRequest } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import binIcon from "/bin.png";

export const ArticleCommentCard = ({
  comment,
  articleComments,
  setArticleComments,
  setPostMessage,
  setArticleHasComments,
}) => {
  const { username } = useContext(UserContext);
  const { comment_id } = comment;

  const readableDate = ConvertDate(comment.created_at);

  const deleteComment = async () => {
    try {
      const response = await deleteRequest(`comments/${comment_id}`);
      setPostMessage("Comment deleted!");
      setArticleComments((prevComments) => {
        return prevComments.filter(
          (comment) => comment.comment_id !== comment_id
        );
      });
      if (articleComments.length === 1) setArticleHasComments(false);
      setTimeout(() => setPostMessage(""), 2000);
    } catch (err) {
      console.log("Error:", err);
      setPostMessage("Error deleting comment, please try again.");
      setTimeout(() => setPostMessage(""), 2000);
      throw err;
    }
  };

  return (
    <Card className="comment-card">
      <div className="comment-card-header">
        <div className="comment-info">
          <span className="topic-name">u/{comment.author}</span>
          <span className="dot">•</span>
          <span className="timestamp">{readableDate}</span>
        </div>
      </div>
      <Card.Body>
        <Card.Text>{comment.body}</Card.Text>
        <div className="votes-wrapper">
          <button id="upvote-button">👍</button>
          {comment.votes}
          <button id="downvote-button">👎</button>
        </div>
        <div className="delete-comment-btn-wrapper">
            {username === comment.author ? (
              <Button
                variant="danger"
                id="delete-comment-btn"
                onClick={deleteComment}
              >
                <img
                  id="bin-icon"
                  src={binIcon}
                  alt="Bin icon for deleting comments"
                />
              </Button>
            ) : null}
          </div>
      </Card.Body>
    </Card>
  );
};
