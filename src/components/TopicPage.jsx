import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import Dropdown from "react-bootstrap/Dropdown";
import loadingGif from "/loading.gif";

export const TopicPage = () => {
  const { topic } = useParams();
  const articleTopic = topic;
  const [topicArticles, setTopicArticles] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();
  const [topicExists, setTopicExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const { Topics } = await getRequest("topics");
        const exists = Topics.filter((topic) => topic.slug === articleTopic);
        if (exists.length) setTopicExists(exists);
      } catch (err) {
        console.log("Error fetching topics:", err);
      }
    };

    const fetchTopicArticles = async () => {
      try {
        const params = {
          topic: articleTopic,
        };
        const { articles } = await getRequest("articles", params);
        setTopicArticles(articles);
      } catch (err) {
        console.log("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await getTopics();
      await fetchTopicArticles();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (topicExists) {
      fetchArticles();
      setSearchParams({ sort_by: sortBy, order_by: order });
    }
  }, [sortBy, order]);

  const fetchArticles = async (sort = sortBy, ord = order) => {
    try {
      const queryParams = {
        order_by: ord,
        sort_by: sort,
        topic,
      };
      const { articles } = await getRequest("articles", queryParams);
      setTopicArticles(articles);
    } catch (err) {
      console.log("Error fetching articles:", err);
    }
  };

  const handleSortChange = (sortKey) => {
    setSortBy(sortKey);
  };

  const handleOrderChange = (ord) => {
    setOrder(ord);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  if (!topicExists) {
    return <h1 className="error-message"> ERROR 404: TOPIC NOT FOUND </h1>;
  }

  console.log(topicExists)
  return (
    <div className="articles-page-container">
      <h3>n/{topic.charAt(0).toUpperCase() + topic.slice(1)}</h3>
      <h4>{topicExists[0].description}</h4>

        {(topicExists && !topicArticles.length) ? (<p>No topics to display here...</p>) : (   
          <>
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
        </>
      )}
    </div>
  );
};
