import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useNavigate, useLocation } from "react-router";
import "./News.css";
import Modal from "./Modals/Modal";
import BookMarks from "./BookMarks";
import Weather from "./Weather";
import Calendar from "./Calendar";
import userImg from "../../../assets/images/user.jpg";
import noImg from "../../../assets/images/no-img.png";
import Loader from "../../Common/Loader";

/* ----------------------------------
   CATEGORY NAMES FOR DISPLAY
---------------------------------- */
const categories = [
  "home",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

/* ----------------------------------
   MAP UI NAMES --> GNEWS API NAMES
---------------------------------- */
const categoryMap = {
  home: "general",
  world: "world",
  business: "business",
  technology: "technology",
  entertainment: "entertainment",
  sports: "sports",
  science: "science",
  health: "health",
  nation: "nation",
};

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [lastVisitedPage, setLastVisitedPage] = useState("/categories/home");

  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* ----------------------------------
    EARLY REDIRECT FOR INVALID CATEGORY
  ---------------------------------- */
  useEffect(() => {
    if (
      category &&
      !categoryMap[category] &&
      location.pathname !== "/bookmarks"
    ) {
      navigate("/categories/home", { replace: true });
      
      /* means it does NOT add a new entry to the back button history
      → user hits "back" and doesn't return to the invalid URL (better UX)*/
    }
  }, [category, location.pathname, navigate]);


  /* -------------------------------
     Open / Close Article Modal
  -------------------------------- */
  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  /* -------------------------------
     Add / Remove Bookmarks
  -------------------------------- */
  const handleBookmarkClick = (article) => {
    setBookmarks((prev) => {
      const alreadySaved = prev.some((b) => b.title === article.title);

      const updated = alreadySaved
        ? prev.filter((b) => b.title !== article.title)
        : [...prev, article];

      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  /*  Sync selectedCategory with URL (only map)  */
  useEffect(() => {
    if (location.pathname === "/bookmarks") return;

    if (categoryMap[category]) {
      setSelectedCategory(categoryMap[category]);
    }
  }, [category, location.pathname]);

  /*     Fetch News   */
  useEffect(() => {
    const fetchNews = async () => {
      try {https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=us&apikey=e594a198a130f391ac23bccfbced3fa8`;
        const url = `

        //const response = await fetch(`/.netlify/functions/getNews?category=${selectedCategory}`);

        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const fetchedNews = data.articles || [];

        fetchedNews.forEach((article) => {
          if (!article.image) article.image = noImg;
        });

        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarks(savedBookmarks);

        setHeadline(fetchedNews[0] || null);
        setNews(fetchedNews.slice(1, 7) || []);
      } catch (error) {
        console.error("Error fetching news:", error);

        setHeadline({
          title: "API Rate Limit Exceeded",
          image: "https://via.placeholder.com/600x400?text=Rate+Limit",
        });

        setNews([]);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  /* Track Last Page Before Bookmarks */
  useEffect(() => {
    if (location.pathname !== "/bookmarks") {
      setLastVisitedPage(location.pathname);
    }
  }, [location.pathname]);

  /* Sync Bookmarks Modal With Route  */
  useEffect(() => {
    setShowBookmarksModal(location.pathname === "/bookmarks");
  }, [location.pathname]);

  /* RENDER  */
  return (
    <div className="news-content">

      {/* ---------------- NAVBAR ---------------- */}
      <div className="navbar">
        <div className="user">
          <img src={userImg} alt="User Image" />
          <p>Anna's Page</p>
        </div>

        <nav className="categories">
          <div className="nav-links">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/categories/${cat}`}
                className={`nav-link ${selectedCategory === categoryMap[cat] ? "active-category" : ""
                  }`}
              >
                {cat === "home" ? "Home" : cat}
              </Link>
            ))}

            <Link to="/bookmarks" className="nav-link">
              Bookmarks <i className="fa-solid fa-bookmark"></i>
            </Link>

            <Link to="/contactus" className="nav-link">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>

      {/* ---------------- HEADLINE ---------------- */}
      <div className="news-section">
        {headline ? (
          <div className="headline" onClick={() => handleOpenModal(headline)}>
            <img src={headline.image} alt={headline.title} loading="lazy" />

            <h2 className="headline-title">
              {headline.title}

              <i
                className={`${bookmarks.some((b) => b.title === headline.title)
                    ? "fa-solid"
                    : "fa-regular"
                  } fa-bookmark bookmark`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkClick(headline);
                }}
              ></i>
            </h2>
          </div>
        ) : (
          <Loader />
        )}

        {/* ---------------- NEWS GRID ---------------- */}
        <div className="news-grid">
          {news.map((article, index) => (
            <div
              key={index}
              className="news-grid-item"
              onClick={() => handleOpenModal(article)}
            >
              <img src={article.image} alt={article.title} loading="lazy" />

              <h3>
                {article.title}
                <i
                  className={`${bookmarks.some((b) => b.title === article.title)
                      ? "fa-solid"
                      : "fa-regular"
                    } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(article);
                  }}
                ></i>
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- ARTICLE MODAL ---------------- */}
      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedArticle && (
          <>
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="modal-image"
            />

            <h2 className="modal-title">{selectedArticle.title}</h2>

            <p className="modal-source">
              Source: {selectedArticle.source?.name ?? "Unknown"}
            </p>

            <p className="modal-date">
              {selectedArticle.publishedAt
                ? new Date(selectedArticle.publishedAt).toLocaleString("en-us", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : ""}
            </p>

            <p className="modal-content-text">
              {selectedArticle.content ??
                selectedArticle.description ??
                "No content available for this article."}
            </p>

            <a
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link"
            >
              Read More
            </a>
          </>
        )}
      </Modal>

      {/* ---------------- BOOKMARKS MODAL ---------------- */}
      <BookMarks
        show={showBookmarksModal}
        bookmarks={bookmarks}
        onClose={() => navigate(lastVisitedPage)}
        onSelectArticle={(article) => {
          navigate(lastVisitedPage);
          setTimeout(() => handleOpenModal(article), 50);
        }}
        onDeleteBookmark={handleBookmarkClick}
      />

      {/* ---------------- WEATHER + CALENDAR ---------------- */}
      <div className="weather-calendar">
        <Weather />
        <Calendar />
      </div>
    </div>
  );
};

export default News;
