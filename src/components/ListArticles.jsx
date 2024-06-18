import { useEffect, useState } from "react";
import { getRequest } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export const ListArticles = () => {
  const [articlesReceived, setArticlesReceived] = useState([]);
  const [message, setMessage] = useState("");
  const [sortBy, setSortBy] = useState("items");
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

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

  const fetchArticles = async (sort = sortBy, ord = order) => {
    try {
      const queryParams = {
        order_by: ord.toLowerCase(),
        sort_by: sort || undefined,
      };
      console.log(queryParams);
      const { articles } = await getRequest("articles", queryParams);
      setArticlesReceived(articles);
    } catch (err) {}
  };

  useEffect(() => {
    fetchArticles();
    setSearchParams({ sort_by: sortBy, order_by: order });
  }, [sortBy, order]);

  const handleSortChange = (sortKey) => {
    setSortBy(sortKey);
  };

  const handleOrderChange = (ord) => {
    setOrder(ord);
  };

  return (
    <div className="articles-page-container">
      <h3 id="articles-header">ARTICLES</h3>
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
          {articlesReceived.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </section>
      </div>
    </div>
  );
};
