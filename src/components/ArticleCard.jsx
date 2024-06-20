import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";
import { ConvertDate } from "../utils/convertDate";
import commentIcon from "/comment.png"
import likeIcon from "/like.png"

export const ArticleCard = ({ article }) => {

  const readableDate = ConvertDate(article.created_at)  

  return (
    <Card className="article-card">
      <div className="article-card-header">
        <div className="topic-info">
          <span className="topic-name"><a id="category-link" href={`/topics/${article.topic}`}>n/{article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</a></span>
          <span className="dot">•</span>
          <span className="author">u/{article.author}</span>
          <span className="dot">•</span>
          <span className="timestamp">{readableDate}</span>
        </div>
      </div>
      <Card.Title>
          <a
            id="article-card-title"
            href={"/articles/" + article.article_id}
          >
            {article.title}
          </a>
        </Card.Title>
      {article.article_img_url && (
        <Card.Img variant="top" src={article.article_img_url} />
      )}
      <div className="topic-info article-card-header">
        <span className="author" id="list-comment-text">{article.comment_count} <img id="list-comment-icon" src={commentIcon} alt="Comment icon"/></span>
        <span className="author" id="list-votes-text">{article.votes} <img id="list-like-icon" src={likeIcon} alt="Red heart like icon"/></span>
        </div>
    </Card>
  );
};
