import { useEffect, useState } from "react";
import { getRequest } from "../utils/api";
import { ArticleCard } from "./ArticleCard";

export const ListArticles = () => {
  const [articlesReceived, setArticlesReceived] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRequest("articles")
      .then(({ articles }) => {
        console.log(articles);
        setMessage("");
        setArticlesReceived(articles);
      })
      .catch((err) => {
        setMessage("Error fetching articles. Please refresh.");
        console.log("Error:", err);
        throw err;
      });
  }, []);

  return (
    <div className="articles-page-container">
      <h3 id="articles-header">LIST ARTICLES</h3>
      <div className="query-controls">
        <p>PLACEHOLDER</p>
        <p>PLACEHOLDER</p>
        <p>PLACEHOLDER</p>
      </div>
      <div className="featured-articles-container">
        <section className="articles-section">
          {articlesReceived.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </section>
      </div>
    </div>
  );
};
