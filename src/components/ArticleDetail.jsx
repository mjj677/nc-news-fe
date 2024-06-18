import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest, postRequest } from "../utils/api";
import { ConvertDate } from "../utils/convertDate";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { ArticleCommentCard } from "./ArticleCommentCard";

export const ArticleDetail = () => {
  const { article_id } = useParams();
  const [articleReceived, setArticleReceived] = useState({});
  const [articleAuthorInfo, setArticleAuthorInfo] = useState({});
  const [message, setMessage] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [userVote, setUserVote] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [articleComments, setArticleComments] = useState([]);
  const [articleExists, setArticleExists] = useState(true);
  const [articleHasComments, setArticleHasComments] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticleAndAuthor = async () => {
      try {
        setLoading(true)
        const { article } = await getRequest(`articles/${article_id}`);
        setArticleExists(true);
        setArticleReceived(article[0]);
        const { user } = await getRequest(`users/${article[0].author}`);
        setArticleAuthorInfo(user);
        setLoading(false)
      } catch (err) {
        setArticleExists(false);
        setMessage("Error locating article.");
        console.log("Error:", err);
      }
    };

    const fetchArticleComments = async () => {
      try {
        const { article_comments } = await getRequest(
          `articles/${article_id}/comments`,
          { limit: 100 }
        );
        if (article_comments.length) setArticleHasComments(true)
        const reversedOrderComments = article_comments.reverse();
setArticleExists(true);
        setArticleComments(reversedOrderComments);
      } catch (err) {
        setArticleHasComments(false)
        setArticleExists(false);
        console.log("Error:", err);
        throw err;
      }
    };
    fetchArticleAndAuthor();
    fetchArticleComments();
  }, []);

  const voteArticle = async (inc_votes) => {
    try {
      const body = { inc_votes };
      const { patched_article } = await patchRequest(
        `/articles/${article_id}/`,
        body
      );
      setArticleReceived(patched_article);
      setArticleExists(true);
      setUserVote(inc_votes === userVote ? 0 : inc_votes);
    } catch (err) {
      setArticleExists(false);
      setMessage("Error locating article.");
      console.log("Error:", err);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 1);
  };

  const handleBodyChange = (e) => {
    setCommentBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentBody !== "") {
      try {
        const body = {
          username: "jessjelly",
          body: commentBody,
        };
        const { posted_comment } = await postRequest(
          `/articles/${articleReceived.article_id}/comments`,
          body
        );
        console.log(posted_comment);
        setPostMessage("Comment posted!");
        setArticleHasComments(true)
        setTimeout(() => setPostMessage(""), 2000);
        setArticleComments((prevComments) => {
          return [posted_comment, ...prevComments];
        });
        setCommentBody("");
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    } else {
      setPostMessage("Can't post an empty comment!");
      setTimeout(() => setPostMessage(""), 2000);
    }
  };

  const readableDate = ConvertDate(articleReceived.article_id);


  console.log(articleHasComments)
  return articleExists ? (
    <div className="article-detail-container">
      <Card className="article-detail-card">
        <div className="article-detail-card-header">
          <div className="article-detail-topic-info">
            {articleAuthorInfo.avatar_url && (
              <div className="profile-picture-container">
                <img
                  id="article-detail-profile-picture"
                  src={articleAuthorInfo.avatar_url}
                />
              </div>
            )}
            <div className="article-detail-text-container">
              {articleReceived.topic && (
                <span className="topic-name">
                  n/
                  {articleReceived.topic.charAt(0).toUpperCase() +
                    articleReceived.topic.slice(1)}
                </span>
              )}
              <span className="dot">•</span>
              <span className="timestamp">&nbsp;{readableDate}&nbsp;</span>
              <br />
              <span className="author">{articleReceived.author}</span>
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Img
            variant="top"
            id="article-detail-img"
            src={articleReceived.article_img_url}
          />
          <Card.Title id="article-detail-title">
            {articleReceived.title}
          </Card.Title>
          <Card.Text id="article-detail-body">{articleReceived.body}</Card.Text>
          <div className="votes-wrapper">
            <button
              onClick={() => voteArticle(userVote === 1 ? 0 : 1)}
              id="upvote-button"
              disabled={userVote === 1}
            >
              👍
              {/* <img alt="red upvote button" src="/upvote-button-fill.png" id="upvote-button"/> */}
            </button>
            {articleReceived.votes}
            <button
              onClick={() => voteArticle(userVote === -1 ? 0 : -1)}
              id="downvote-button"
              disabled={userVote === -1}
            >
              👎
            </button>
          </div>
        </Card.Body>
      </Card>
      <div className="post-comment-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          <div style={{ position: "relative" }}>
            {postMessage && (
              <Alert
                variant={
                  postMessage === "Can't post an empty comment!"
                    ? "danger"
                    : "success"
                }
                id="comment-alert"
              >
                {postMessage}
              </Alert>
            )}
            <textarea
              id="comment-input"
              className="form-control"
              name="comment"
              rows={isFocused ? "4" : "1"}
              placeholder="Add a comment"
              style={{ resize: "vertical" }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleBodyChange}
              value={commentBody}
            ></textarea>
            {isFocused && (
              <button
                type="submit"
                className="btn btn-primary"
                style={{ position: "absolute", bottom: "30px", right: "10px" }}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      {articleHasComments ? (<section className="article-comments-container">
        {articleComments.map((comment, index) => {
          return (
            <ArticleCommentCard
              key={comment.comment_id * index}
              comment={comment}
              articleComments={articleComments}
              setArticleComments={setArticleComments}
              setPostMessage={setPostMessage}
              setArticleHasComments={setArticleHasComments}
            />
          );
        })}
      </section>) : (<p>No comments to display here...</p>)}
    </div>
  ) : (
    <h1 className="error-message"> ERROR 404: ARTICLE NOT FOUND </h1>
  );
};
