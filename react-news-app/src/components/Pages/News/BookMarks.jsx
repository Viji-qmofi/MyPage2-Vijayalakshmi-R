import Modal from "./Modals/Modal";
import noImg from "../../../assets/images/no-img.png";
import "./BookMarks.css";

const BookMarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
  onDeleteAll,
  onPrev,
  onNext,
  page,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      {/* Header */}
      <div className="bookmarks-header">
        <h2 className="bookmarks-heading">Bookmarked News</h2>
        <button
          className="delete-all-btn"
          onClick={onDeleteAll}
          disabled={!bookmarks.length}
          title={!bookmarks.length ? "No bookmarks to delete" : "Delete all bookmarks"}
        >
          <i className="fa-solid fa-trash"></i> Delete All
        </button>
      </div>

      {/* Bookmarks List */}
      <div className="bookmarks-list">
        {bookmarks.length ? (
          bookmarks.map((article, index) => (
            <div className="bookmark-item" key={article.url || index} onClick={() => onSelectArticle(article)}>
              <img src={article.image || noImg} alt={article.title} />
              <h3>{article.title}</h3>
              <span className="delete-button" onClick={(e) => { e.stopPropagation(); onDeleteBookmark(article); }}>
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))
        ) : (
          <p>No bookmarks found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="bookmarks-pagination">
        <button onClick={onPrev} disabled={page === 0}>Prev</button>
        <span>Page {page + 1}</span>
        <button onClick={onNext} disabled={bookmarks.length < 6}>Next</button>
      </div>
    </Modal>
  );
};

export default BookMarks;