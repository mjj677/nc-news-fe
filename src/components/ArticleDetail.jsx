import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../utils/api";
import { ConvertDate } from "../utils/convertDate";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ArticleComments } from "./ArticleComments";

export const ArticleDetail = () => {
  const { article_id } = useParams();
  const [articleReceived, setArticleReceived] = useState({});
  const [articleAuthorInfo, setArticleAuthorInfo] = useState({});
  const [message, setMessage] = useState("");
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    const fetchArticleAndAuthor = async () => {
      try {
        const { article } = await getRequest(`articles/${article_id}`);
        setArticleReceived(article[0]);

        const { user } = await getRequest(`users/${article[0].author}`);
        setArticleAuthorInfo(user);
      } catch (err) {
        setMessage("Error locating article.");
        console.log("Error:", err);
      }
    };

    fetchArticleAndAuthor();
  }, []);

  const voteArticle = async (inc_votes) => {
    try {
      const body = { inc_votes };
      const { patched_article } = await patchRequest(
        `/articles/${article_id}/`,
        body
      );
      setArticleReceived(patched_article);
      setUserVote(inc_votes === userVote ? 0 : inc_votes);
    } catch (err) {
      setMessage("Error locating article.");
      console.log("Error:", err);
    }
  };

  const readableDate = ConvertDate(articleReceived.article_id);

  return (
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
            <Card.Text id="votes-text">
              VOTES: {articleReceived.votes}
            </Card.Text>
            <Card.Text>
              <button
                onClick={() => voteArticle(userVote === 1 ? 0 : 1)}
                id="upvote-button"
                disabled={userVote === 1}
              >
                👍
              </button>
            </Card.Text>
            <Card.Text>
              <button
                onClick={() => voteArticle(userVote === -1 ? 0 : -1)}
                id="downvote-button"
                disabled={userVote === -1}
              >
                👎
              </button>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
      <div className="post-comment-container">
        <form className="comment-form">
          <textarea
            id="comment-input"
            className="form-control"
            name="comment"
            rows="3"
            placeholder="Add a comment"
            style={{ resize: "vertical" }}
          ></textarea>
        </form>
      </div>
      <ArticleComments />
    </div>
  );
};
