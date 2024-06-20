import { useState, useEffect, useContext } from "react";
import { getRequest, postRequest } from "../utils/api";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { UserContext } from "../context/UserContext";

export const PostArticle = () => {
  const { username } = useContext(UserContext);
  const [receivedCategories, setReceivedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Select a topic");
  const [article, setArticle] = useState({
    author: username,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [newCategory, setNewCategory] = useState({
    slug: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false)

  useEffect(() => {
    setLoading(true);
    const fetchTopics = async () => {
      try {
        const { Topics } = await getRequest("topics");
        setReceivedCategories(Topics);
      } catch (err) {
        console.log("Error:", err);
      }
      setLoading(false);
    };

    fetchTopics();
  }, []);

  const validateImgUrl = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => setIsImgUrlValid(true);
    img.onerror = () => setIsImgUrlValid(false);
  }

  const handleSelect = (eventKey) => {
    if (eventKey === "clearSelection") {
      setSelectedCategory("Select a topic");
    } else {
      const selectedCat = receivedCategories.find((category) => {
        return category.slug === eventKey;
      });
      if (selectedCat) {
        setSelectedCategory(
          eventKey.charAt(0).toUpperCase() + eventKey.slice(1)
        );
        setArticle({
          ...article,
          topic: eventKey,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });

    if (name === "article_img_url") {
        validateImgUrl(value)
    }
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleSubmitArticle = async (e) => {
    e.preventDefault();

    if (newCategory.topic && selectedCategory !== "Select a topic") {
      setMessage("Error: 2 categories selected. Please remove one selection.");
      return;
    }

    try {
      if (newCategory.slug && newCategory.description) {
        const data = await postRequest("topics", newCategory);
        setSelectedCategory(data.slug);
        setArticle({
          ...article,
          topic: data.slug,
        });

        await postRequest("articles", {
          ...article,
          topic: data.slug,
        });

        setMessage("Article posted!");
        setArticle({
          author: username,
          title: "",
          body: "",
          topic: "",
          article_img_url: "",
        });
        setNewCategory({
          slug: "",
          description: "",
        });
        setSelectedCategory("Select a category");
      } else {
        await postRequest("articles", article);

        setMessage("Article posted!")
        setArticle({
            author: username,
            title: "",
            body: "",
            topic: "",
            article_img_url: "",
          });
          setNewCategory({
            slug: "",
            description: "",
          });
          setSelectedCategory("Select a category");
      }
    } catch (err) {
        console.log("Error:", err)
        setMessage("Error posting article or category...")
    }
  };

  return (
    <div className="post-article-page-container">
      <h3>POST ARTICLE</h3>
      {message ? <Alert>{message}</Alert> : null}
      <div className="post-article-form-container">
        <form className="post-article-form" onSubmit={handleSubmitArticle}>
          <Dropdown onSelect={handleSelect} required id="create-dropdown">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedCategory}
            </Dropdown.Toggle>

            <Dropdown.Menu className="scrollable-dropdown-menu" flip={false}>
              {loading ? (
                <Dropdown.Item disabled>Fetching categories...</Dropdown.Item>
              ) : (
                receivedCategories.map((category) => {
                  return (
                    <Dropdown.Item key={category.slug} eventKey={category.slug}>
                      {category.slug.charAt(0).toUpperCase() +
                        category.slug.slice(1)}
                    </Dropdown.Item>
                  );
                })
              )}
              <Dropdown.Divider />
              <Dropdown.Item eventKey="clearSelection">
                Clear selection
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="create-topic-container">
          <label>Topic not listed? Create one below:</label>
          <input
            id="create-category"
            className="form-control"
            name="slug"
            onChange={handleNewCategoryChange}
            value={newCategory.slug}
            placeholder="Topic name"
            disabled={selectedCategory !== "Select a topic"}
          ></input>
          <input
            id="create-category-description"
            className="form-control"
            name="description"
            onChange={handleNewCategoryChange}
            value={newCategory.description}
            placeholder="Topic description"
            disabled={selectedCategory !== "Select a topic"}
          ></input>
          </div>
          <input
            id="post-article-title"
            className="form-control"
            name="title"
            required
            onChange={handleChange}
            placeholder="Title*"
          ></input>
          <textarea
            id="post-article-body"
            className="form-control"
            name="body"
            required
            placeholder="Body*"
            rows="8"
            style={{ resize: "vertical" }}
            onChange={handleChange}
          ></textarea>
          <input
            id="post-article-image"
            className="form-control"
            name="article_img_url"
            required
            placeholder="Image URL*"
            onChange={handleChange}
          ></input>
          {isImgUrlValid && (<div className="image-preview">
            <img id="preview-image" src={article.article_img_url} alt="Article image preview" />
          </div>)}
          <Button id="post-article-button" type="submit" disabled={!article.title || !article.body || !article.topic || !article.article_img_url}>
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};
