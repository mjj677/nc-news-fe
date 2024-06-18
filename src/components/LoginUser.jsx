import { useContext, useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import loadingGif from "/loading.gif";

export const LoginUser = () => {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Select a user");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {users} = await getRequest("users")
        setUsers(users);
        setMessage("");
      } catch (err) {
        setMessage("Error fetching users. Please refresh.");
        console.log("Error:", err);
        throw err;
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUsername = (eventKey) => {
    const selectedDropdownUser = users.find(
      (user) => user.username === eventKey
    );
    if (selectedDropdownUser) {
      setSelectedUser(selectedDropdownUser.username);
      setInputValue(selectedDropdownUser.username);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser !== "Select a user") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setUsername(selectedUser);
        navigate("/articles");
      }, 2000);
    } else {
      setMessage("Must select a user to log in!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-content">
        <h3>NORTHITT</h3>
        <h4>LOGIN</h4>
        {loading ? (
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        ) : (
          <>
            <Form onSubmit={handleLogin} className="login-form">
              <Form.Group>
                <div className="username-container">
                  <Form.Control
                    id="username-input"
                    type="username"
                    placeholder="Username"
                    value={inputValue}
                    readOnly
                  />
                </div>
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
            <div className="dropdown-wrapper">
              <Dropdown onSelect={handleSelectUsername} required>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {selectedUser}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="scrollable-dropdown-menu"
                  flip={false}
                >
                  {users.map((user) => {
                    return (
                      <Dropdown.Item
                        key={user.username}
                        eventKey={user.username}
                      >
                        {user.username}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
