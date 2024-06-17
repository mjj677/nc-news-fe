import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";
import { ConvertDate } from "../utils/convertDate";

export const ArticleCard = ({ article }) => {

  const readableDate = ConvertDate(article.created_at)  

  const handleTitleClick = (article_id) => {
    console.log(article_id);
  };

  return (
    <Card className="article-card">
      <div className="article-card-header">
        <div className="topic-info">
          <span className="topic-name">n/{article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</span>
          <span className="dot">•</span>
          <span className="author">{article.author}</span>
          <span className="dot">•</span>
          <span className="timestamp">{readableDate}</span>
        </div>
      </div>
      {article.article_img_url && (
        <Card.Img variant="top" src={article.article_img_url} />
      )}
      <Card.Body>
        <Card.Title>
          <a
            href={"/articles/" + article.article_id}
            onClick={() => handleTitleClick(article.article_id)}
          >
            {article.title}
          </a>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};
