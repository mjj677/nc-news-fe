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
        console.log(data);
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
          <Navbar.Brand>NORTHITT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">HOME</Nav.Link>
              <Nav.Link href="/articles">ARTICLES</Nav.Link>
              <Nav.Link href="/articles/post">MAKE A POST</Nav.Link>
              <Nav.Link href="/users">USERS</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
