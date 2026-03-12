import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import "./News.css";
import Modal from "./Modals/Modal";
import BookMarks from "./BookMarks";
import Weather from "./Weather";
import Calendar from "./Calendar";
import noImg from "../../../assets/images/no-img.png";
import Loader from "../../Common/Loader";
import api from "../../../api/axios";
import Swal from "sweetalert2";

/* ------------------- Category mappings ------------------- */
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

const BOOKMARK_SIZE = 6;

const News = () => {
  const { user } = useContext(AuthContext);
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [bookmarksModal, setBookmarksModal] = useState([]); // current modal page
  const [bookmarkedUrls, setBookmarkedUrls] = useState(new Set()); // for icons
  const [bookmarkPage, setBookmarkPage] = useState(0);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [lastVisitedPage, setLastVisitedPage] = useState("/categories/home");

  const profilePicSrc = user?.profilePicUrl
    ? `http://localhost:8080${user.profilePicUrl}`
    : "https://via.placeholder.com/50";

  /* ---------------- Redirect invalid category ---------------- */
  useEffect(() => {
    if (category && !categoryMap[category] && location.pathname !== "/bookmarks") {
      navigate("/categories/home", { replace: true });
    }
  }, [category, location.pathname, navigate]);

  /* ---------------- Sync category ---------------- */
  useEffect(() => {
    if (location.pathname === "/bookmarks") return;
    if (categoryMap[category]) setSelectedCategory(categoryMap[category]);
  }, [category, location.pathname]);

  /* ---------------- Track last visited page ---------------- */
  useEffect(() => {
    if (location.pathname !== "/bookmarks") setLastVisitedPage(location.pathname);
  }, [location.pathname]);

  /* ---------------- Show Bookmarks modal ---------------- */
  useEffect(() => {
    if (location.pathname === "/bookmarks") {
      setShowBookmarksModal(true);
      fetchBookmarks(0); // load first page for modal
    } else {
      setShowBookmarksModal(false);
    }
  }, [location.pathname]);

  /* ---------------- Open / Close Article Modal ---------------- */
  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  /* ---------------- Fetch all bookmarked URLs once ---------------- */
  const fetchBookmarksAll = async () => {
    try {
      const res = await api.get("/bookmarks/getAll");
      const urls = new Set(res.data.data.map((b) => b.url));
      setBookmarkedUrls(urls);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBookmarksAll();
  }, [user?.email]);

  /* ---------------- Fetch paginated bookmarks for modal ---------------- */
  const fetchBookmarks = async (page = 0) => {
    try {
      const res = await api.get("/bookmarks/get", { params: { page, size: BOOKMARK_SIZE } });
      setBookmarksModal(res.data.data || []);
      setBookmarkPage(page);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    }
  };

  /* ---------------- Optimistic Bookmark Toggle ---------------- */
  const handleBookmarkClick = async (article) => {
    const url = article.url;
    const isBookmarked = bookmarkedUrls.has(url);

    setBookmarkedUrls((prev) => {
      const newSet = new Set(prev);
      isBookmarked ? newSet.delete(url) : newSet.add(url);
      return newSet;
    });

    try {
      if (isBookmarked) await api.delete("/bookmarks/delete", { params: { url } });
      else {
        const payload = {
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          image: article.image,
          source: article.source?.name || article.source || "Unknown",
          publishedAt: article.publishedAt,
        };
        await api.post("/bookmarks/add", payload);
      }

      fetchBookmarks(bookmarkPage); // refresh modal page
    } catch (err) {
      console.error(err);
      setBookmarkedUrls((prev) => {
        const newSet = new Set(prev);
        isBookmarked ? newSet.add(url) : newSet.delete(url);
        return newSet;
      });
    }
  };

  /* ---------------- Delete All Bookmarks ---------------- */
  const handleDeleteAllBookmarks = async () => {
    const result = await Swal.fire({
      title: "Delete all bookmarks?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete("/bookmarks/delete-all");
      setBookmarkedUrls(new Set());
      setBookmarksModal([]);
      setBookmarkPage(0);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "All bookmarks removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to delete bookmarks" });
    }
  };

  /* ---------------- Fetch News ---------------- */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=us&apikey=e594a198a130f391ac23bccfbced3fa8`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const fetchedNews = data.articles || [];

        fetchedNews.forEach((article) => {
          if (!article.image) article.image = noImg;
        });

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

  /* ---------------- Render ---------------- */
  return (
    <div className="news-content">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="user" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
          <img src={profilePicSrc} alt="Profile" className="profile-pic" />
          <p>{user?.fullName || "User"}</p>
        </div>

        <nav className="categories">
          <div className="nav-links">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/categories/${cat}`}
                className={`nav-link ${
                  selectedCategory === categoryMap[cat] ? "active-category" : ""
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

      {/* HEADLINE */}
      <div className="news-section">
        {headline ? (
          <div className="headline" onClick={() => handleOpenModal(headline)}>
            <img src={headline.image} alt={headline.title} loading="lazy" />
            <h2 className="headline-title">
              {headline.title}
              <i
                className={`${bookmarkedUrls.has(headline.url) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                onClick={(e) => { e.stopPropagation(); handleBookmarkClick(headline); }}
              ></i>
            </h2>
          </div>
        ) : <Loader />}

        {/* NEWS GRID */}
        <div className="news-grid">
          {news.map((article) => (
            <div key={article.url} className="news-grid-item" onClick={() => handleOpenModal(article)}>
              <img src={article.image} alt={article.title} loading="lazy" />
              <h3>
                {article.title}
                <i
                  className={`${bookmarkedUrls.has(article.url) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                  onClick={(e) => { e.stopPropagation(); handleBookmarkClick(article); }}
                ></i>
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ARTICLE MODAL */}
      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedArticle && (
          <>
            <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-image" />
            <h2 className="modal-title">{selectedArticle.title}</h2>
            <p className="modal-source">Source: {selectedArticle.source?.name ?? "Unknown"}</p>
            <p className="modal-date">
              {selectedArticle.publishedAt ? new Date(selectedArticle.publishedAt).toLocaleString() : ""}
            </p>
            <p className="modal-content-text">{selectedArticle.content ?? selectedArticle.description ?? "No content available"}</p>
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="read-more-link">Read More</a>
          </>
        )}
      </Modal>

      {/* BOOKMARKS MODAL */}
      <BookMarks
        show={showBookmarksModal}
        bookmarks={bookmarksModal}
        onClose={() => navigate(lastVisitedPage)}
        onSelectArticle={(article) => { navigate(lastVisitedPage); setTimeout(() => handleOpenModal(article), 50); }}
        onDeleteBookmark={handleBookmarkClick}
        onDeleteAll={handleDeleteAllBookmarks}
        onPrev={() => fetchBookmarks(Math.max(0, bookmarkPage - 1))}
        onNext={() => fetchBookmarks(bookmarkPage + 1)}
        page={bookmarkPage}
      />

      {/* WEATHER + CALENDAR */}
      <div className="weather-calendar">
        <Weather />
        <Calendar />
      </div>
    </div>
  );
};

export default News;