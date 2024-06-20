import { ArticleCard } from "./ArticleCard";
import { getRequest } from "../utils/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { UserCard } from "./UserCard";
import loadingGif from "/loading.gif";
import robot from "/robot.png"

export const UserPosts = () => {
  const { username } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { articles } = await getRequest("articles");
        setArticles(articles);
        const filteredArticles = articles.filter((article) => {
          return article.author === username;
        });
        setFilteredArticles(filteredArticles);
      } catch (err) {
        console.log("Error:", err);
      }
      setLoading(false);
    };

    const fetchUser = async () => {
        setLoading(true)
      try {
        const { users } = await getRequest("users");
        const postUser = users.filter((user) => {
          return user.username === username;
        });
        setUser(postUser[0]);
      } catch (err) {
        console.log("Error:", err)
      }
      setLoading(false)
    };

    fetchArticles();
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="user-articles-page-container">
      <div className="user-posts-card">
        <UserCard user={user} articles={articles} />
      </div>
      {filteredArticles.length ? (   <section className="articles-section">
        {filteredArticles.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </section>) : (<div id="no-posts-wrapper">
        <h4 id="has-not-posted">u/{username} hasn't posted yet</h4>
        <img id="not-found-robot" src={robot} alt="Robot looking at the sky"/>
        </div>)}
    </div>
  );
};
