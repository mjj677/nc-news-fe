import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { ConvertDate } from "../utils/convertDate";
import { getRequest, deleteRequest } from "../utils/api";

export const ArticleCommentCard = ({ comment, setArticleComments, setPostMessage }) => {
  const username = "jessjelly";
  const {comment_id} = comment

  const readableDate = ConvertDate(comment.created_at);

  const deleteComment = async () => {

    try {
        const response = await deleteRequest(`comments/${comment_id}`)
        console.log("Comment deleted.")
        setPostMessage("Comment deleted!")
        setArticleComments((prevComments) => {
            return prevComments.filter((comment) => comment.comment_id !== comment_id)
        })
        setTimeout(() => setPostMessage(""), 2000)
    } catch (err) {
        console.log("Error:", err)
        setPostMessage("Error deleting comment, please try again.")
        setTimeout(() => setPostMessage(""), 2000)
        throw err
    }
  }

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
          <div className='delete-comment-btn-wrapper'>
              {username === comment.author ? <Button variant="danger" id="delete-comment-btn" onClick={deleteComment}>Remove</Button> : null}
              </div>
        </div>
      </Card.Body>
    </Card>
  );
};
