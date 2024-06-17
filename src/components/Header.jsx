import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";
import { getRequest } from "../utils/api";

export const Header = () => {
  const { username, setUsername } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    getRequest(`users/${username}`)
      .then((data) => {
        
      })
      .catch((err) => {
        console.log("Error:", err);
        throw err;
      });
  });

  return (
    <div>
      <Navbar expand="xl" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/articles">
          <img 
          alt="Northitt logo"
          src="/reddit-fill-logo.256x256.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          />{' '}
          Northitt
          </Navbar.Brand>
          <div className="create-wrapper">
          <Nav.Link href="/articles/post" className="justify-content-center create">+ CREATE</Nav.Link>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/articles">ARTICLES</Nav.Link>
              <Nav.Link href="/users">USERS</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: User
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
