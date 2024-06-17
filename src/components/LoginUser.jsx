import { useContext, useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "../../src/App.css";

export const LoginUser = () => {
  const { setUsername } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Select a user");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRequest("users")
      .then(({ users }) => {
        console.log(users);
        setUsers(users);
        setMessage("");
      })
      .catch((err) => {
        setMessage("Error fetching users. Please refresh.");
        console.log("Error:", err);
        throw err;
      });
  }, []);

  return (
    <div className="login-page-container">
      <h4>NORTHITT</h4>
      <h3>LOGIN</h3>
      <Form>
        <Form.Group className="login-form">
          <div className="username-container">
            <Form.Label id="username-text">Username</Form.Label>
            <Form.Control
              id="username-input"
              type="username"
              placeholder="Enter Username"
            />
          </div>
          <Form.Text className="text-muted">
            Pick a name from the dropdown
          </Form.Text>
        </Form.Group>
      </Form>
      <div className="dropdown-wrapper">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedUser}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {users.map((user) => {
              return (
                <Dropdown.Item href="#" key={user.username}>
                  {user.username}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
