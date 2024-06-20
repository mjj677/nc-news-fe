import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getRequest } from "../utils/api";
import { UserCard } from "./UserCard";
import loadingGif from "/loading.gif";

export const UserList = () => {
  const { username } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { users } = await getRequest("users");
        setUsers(users);
      } catch {
        setMessage("Error fetching users. Please refresh.");
        console.log("Error:", err);
      }
      setLoading(false);
    };

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { articles } = await getRequest("articles");
        setArticles(articles)
      } catch (err) {
        setMessage("Error fetching articles. Please refresh. ");
        console.log("Error:", err);
      }
    };

    fetchUsers();
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <h3>USERS</h3>
      <div className="user-cards-container">
        <section className="users-section">
          {users.map((user) => {
            return <UserCard key={user.username} user={user} articles={articles}/>;
          })}
        </section>
      </div>
    </div>
  );
};
