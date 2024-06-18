import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import { ArticleCard } from "./ArticleCard";

export const TopicPage = () => {
  const { topic } = useParams();
  const [topicArticles, setTopicArticles] = useState([])

  useEffect(() => {
    const fetchTopicArticles = async () => {
      try {
        const params = {topic}
        const {articles} = await getRequest('articles', params)
        setTopicArticles(articles)
      } catch (err) {}
    };

    fetchTopicArticles()
  }, []);

  return (
    <div className="articles-page-container">
      <h3>n/{topic.charAt(0).toUpperCase() + topic.slice(1)}</h3>
      <div className="query-controls">
        <p>PLACEHOLDER</p>
        <p>PLACEHOLDER</p>
        <p>PLACEHOLDER</p>
      </div>
      <div className="featured-articles-container">
        <section className="articles-section">
          {topicArticles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </section>
      </div>
    </div>
  );
};
