import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import Dropdown from "react-bootstrap/Dropdown"

export const TopicPage = () => {
  const { topic } = useParams();
  const articleTopic = topic
  const [topicArticles, setTopicArticles] = useState([])
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTopicArticles = async () => {
      try {
        const params = {
            topic: articleTopic}
        const { articles } = await getRequest('articles', params)
        setTopicArticles(articles)
      } catch (err) {}
    };
    fetchTopicArticles()
  }, []);

  useEffect(() => {
    fetchArticles();
    setSearchParams({ sort_by: sortBy, order_by: order});
  }, [sortBy, order]);

  const fetchArticles = async (sort = sortBy, ord = order) => {
    try {
      const queryParams = {
        order_by: ord,
        sort_by: sort,
        topic
      };
      const { articles } = await getRequest("articles", queryParams);
      setTopicArticles(articles);
    } catch (err) {}
  };


  const handleSortChange = (sortKey) => {
    setSortBy(sortKey);
  }

  const handleOrderChange = (ord) => {
    setOrder(ord);
  }
  return (
    <div className="articles-page-container">
      <h3>n/{topic.charAt(0).toUpperCase() + topic.slice(1)}</h3>
      <div className="query-controls">
        <Dropdown id="sort-by-dropdown" onSelect={handleSortChange}>
          <Dropdown.Toggle variant="secondary">Sort by</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="created_at">Date</Dropdown.Item>
            <Dropdown.Item eventKey="comment_count">
              Comment count
            </Dropdown.Item>
            <Dropdown.Item eventKey="votes">Votes</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown id="order-by-dropdown" onSelect={handleOrderChange}>
          <Dropdown.Toggle variant="secondary">Order</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="featured-articles-container">
        <section className="articles-section">
        <div className="query-text">
          <p id="sorted-by-text">
            Sorted by:{" "}
            {sortBy === "created_at"
              ? "Date"
              : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}{" "}
          </p>
          <p id="order-by-text">
            Order:{" "}
            {order
              ? order.charAt(0).toUpperCase() + order.slice(1) + "ending"
              : "Descending"}
          </p>
          </div>
          {topicArticles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </section>
      </div>
    </div>
  );
};
