import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";
import { getRequest } from "../utils/api";
import homeIcon from "/home.png";
import usersIcon from "/users.png";
import controlSidebarIcon from "/arrow.png";
import aboutIcon from "/about.png";
import postIcon from "/post.png";

export const Header = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { user } = await getRequest(`users/${username}`);
        // to be implemented later (profile picture)
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    };

    const getTopics = async () => {
      try {
        const { Topics } = await getRequest("topics");
        setTopics(Topics);
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    };

    getUser();
    getTopics();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    setUsername("");
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    if (showSidebar) {
        document.addEventListener("mousedown", handleClickOutside);
    } else {
        document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar])

  return (
    <div id="app-container">
      <button
      ref={buttonRef}
        onClick={toggleSidebar}
        className={`toggle-sidebar-button ${showSidebar ? "" : "active"}`}
      >
        <img
          id="arrow-icon"
          src={controlSidebarIcon}
          alt="Arrow icon to show or hide thes= sidebar"
        />
      </button>
      {showSidebar && (
        <div ref={sidebarRef} className={`sidebar ${showSidebar ? "active" : "hidden"}`}>
          <Nav className="flex-column" expand="xl">
            <Nav.Link href="/articles" id="home-sidebar-text">
              <img id="home-icon" src={homeIcon} alt="Home icon" /> Home
            </Nav.Link>
            <Nav.Link href="/users" id="users-sidebar-text">
              <img id="users-icon" src={usersIcon} alt="Users icon" /> Users
            </Nav.Link>
            <hr className="sidebar-divider" />
            <NavDropdown
              title="Category"
              id="basic-nav-dropdown sidebar-dropdown"
              className="justify-content-center"
            >
              {topics.map((topic) => {
                return (
                  <NavDropdown.Item
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                  >
                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <hr className="sidebar-divider" />
            <Nav.Link href={`/${username}/posts`}>
              <img id="post-icon" src={postIcon} alt="Post icon" /> Your posts
            </Nav.Link>
            <Nav.Link id="about-sidebar-text" href="/about">
              <img id="about-icon" src={aboutIcon} alt="About icon" /> About
              Northitt
            </Nav.Link>
            <Button variant="danger" id="logout-btn" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </div>
      )}

      <div className="main-navbar">
        <Navbar expand="xl" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/articles">
              <img
                alt="Northitt logo"
                src="/reddit-fill-logo.256x256.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Northitt
            </Navbar.Brand>
            <div className="create-wrapper">
              <Nav.Link
                href="/articles/post"
                className="justify-content-center"
              >
                ＋ Create
              </Nav.Link>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Signed in as: {username}</Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
