// BookMarks.jsx
import React from "react";
import Modal from "./Modals/Modal";
import noImg from "../../../assets/images/no-img.png"; 
import "./BookMarks.css";

const BookMarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="bookmarks-heading">Bookmarked News</h2>

      <div className="bookmarks-list">
        {bookmarks.map((article, index) => (
          <div
            className="bookmark-item"
            key={index}
            onClick={() => onSelectArticle(article)}
          >
            <img src={article.image || noImg} alt={article.title} />

            <h3>{article.title}</h3>

            <span
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // prevent opening
                onDeleteBookmark(article);
              }}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default BookMarks;
