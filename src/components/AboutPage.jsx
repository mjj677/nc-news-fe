import Card from "react-bootstrap/Card";
import githubIcon from "/github.png";

export const AboutPage = () => {
  return (
    <div className="about-page-container">
      <Card id="about-card">
        <Card.Title>About Northitt</Card.Title>
        <Card.Body>
          <Card.Text>
            <span style={{ fontWeight: "bold" }}>'Northitt'</span> is a
            portfolio piece, made to demonstrate my ability to create a
            Full-Stack application. Using JavaScript and Node.js on a PSQL
            back-end. Utilising React, paired with Vite for the front-end.
            Hosted on Netlify.
          </Card.Text>
          <Card.Text>
            My goal was to emulate the core functionality of a popular
            forum-site like Reddit, hence the name. The basic functions of this
            site allow users to post, comment and like articles, to and from the
            news feed.
          </Card.Text>
          <Card.Text>
            If you would like to see more of my work, you can visit the link
            below.
          </Card.Text>
          <Card.Subtitle>Enjoy!</Card.Subtitle>
          <div className="github-link-wrapper">
            <img src={githubIcon} alt="GitHub icon" id="github-icon" />
            <a href="https://github.com/mjj677" target="_blank" rel="noopener noreferrer" id="github-link">My GitHub page</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
