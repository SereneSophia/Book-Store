import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contects/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const ReviewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]); // Reviews state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 5; // Number of reviews per page
  const [totalReviews, setTotalReviews] = useState(0); // Total reviews count
  const [newReview, setNewReview] = useState(''); // New review input state
  const [showToast, setShowToast] = useState(false); // To handle popup visibility
  const { user } = useContext(UserContext); // Get user info from context
  const navigate = useNavigate(); // To programmatically navigate if needed

  useEffect(() => {
    // Fetch book details
    window.scrollTo(0, 0);
    fetch(`https://bookstore-project-ues5.onrender.com/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        if (typeof data.author === 'string') {
          data.author = data.author.split(',').map(author => author.trim());
        }
        if (typeof data.genre === 'string') {
          data.genre = data.genre.split(',').map(genre => genre.trim());
        }
        setBook(data);
      })
      .catch(err => console.error(err));

    // Fetch paginated reviews
    fetch(`https://bookstore-project-ues5.onrender.com/api/books/${id}/reviews?page=${currentPage}&limit=${reviewsPerPage}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews);
        setTotalPages(Math.ceil(data.totalReviews / reviewsPerPage));
      })
      .catch(err => console.error(err));
  }, [id, currentPage]);

  const handleLike = (reviewId) => {
    if (!reviewId) return; // Avoid sending undefined or null

    fetch(`https://bookstore-project-ues5.onrender.com/api/reviews/${reviewId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(() => {
        // Optionally update local state to reflect the like
        setReviews(reviews.map(review =>
          review.review_id === reviewId
            ? { ...review, likes: review.likes + 1 }
            : review
        ));
      })
      .catch(err => console.error(err));
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = [...existingCart, { title: book.title, price: book.price }];
    localStorage.setItem('cart', JSON.stringify(newCart));

    setShowToast(true); // Show the popup
    setTimeout(() => setShowToast(false), 3000); // Hide the popup after 3 seconds
  };

  const handlePostReview = () => {
    if (!newReview.trim()) return;

    fetch(`https://bookstore-project-ues5.onrender.com/api/books/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newReview }),
    })
      .then(res => res.json())
      .then(() => {
        // Reset to page 1 after posting a new review, if you want to show the latest reviews first
        setCurrentPage(1);

        // Fetch the first page of reviews
        fetch(`https://bookstore-project-ues5.onrender.com/api/books/${id}/reviews?page=1&limit=${reviewsPerPage}`)
          .then(res => res.json())
          .then(data => {
            setReviews(data.reviews);
            setTotalPages(Math.ceil(data.totalReviews / reviewsPerPage));
          })
          .catch(err => console.error(err));

        setNewReview(''); // Clear the review input
      })
      .catch(err => console.error(err));
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!book) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className='bg-teal-100 min-h-screen pt-28 px-4 lg:px-24 flex justify-between'>
      {/* Left division with image */}
      <div className='lg:w-1/4 h-[400px] flex-shrink-0 sticky top-28 rounded-lg p-4 overflow-hidden'>
        <img src={book.image_url} alt={book.title} className='h-48 w-full object-contain rounded' />
        <button onClick={handleAddToCart} className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
          Add to Cart
        </button>
      </div>

      {/* Right division with text */}
      <div
        className='lg:w-3/4 lg:ml-8 border border-gray-300 rounded-lg p-6 bg-white shadow-md'
        style={{
          maxHeight: 'calc(100vh - 112px)',
          overflowY: 'auto',
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        }}
      >
        {/* Hide scrollbar for WebKit-based browsers */}
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className='mb-8'>
          <h2 className='text-4xl font-bold text-gray-800'>{book.title}</h2>

          <div className='mt-4 text-xl'>
            <p className='font-semibold text-gray-600'>Author:</p>
            <div>
              {book.author.map((author, index) => (
                <React.Fragment key={index}>
                  <Link
                    to="/shop"
                    state={{ searchTerm: author }}  // Pass the author to shop via state
                    className='text-blue-500 hover:underline'
                  >
                    {author}
                  </Link>
                  {index < book.author.length - 1 && ', '}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className='mt-4 text-xl'>
            <p className='font-semibold text-gray-600'>Genre:</p>
            <div>
              {book.genre.map((genre, index) => (
                <React.Fragment key={index}>
                  <Link
                    to="/shop"
                    state={{ filter: genre }}  // Pass the genre to shop via state
                    className='text-blue-500 hover:underline'
                  >
                    {genre}
                  </Link>
                  {index < book.genre.length - 1 && ', '}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className='text-2xl font-semibold text-gray-700 mt-4'>Price: Ks.{book.price}</p>
        </div>
        <div className='text-lg leading-relaxed font-light text-gray-700'>
          <p>{book.description}</p>
        </div>

        {/* Review Section */}
        <div className="reviews-section mt-8">
          <h3 className="text-2xl font-bold mb-4">Reviews</h3>
          {/* Review form (only if user is logged in) */}
          {user ? (
            <div className="review-form mt-4">
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handlePostReview}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Post Review
              </button>
            </div>
          ) : (
            <p>You must be logged in to post a review.</p>
          )}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mt-8">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="flex items-start mb-6 border-b pb-4">
                  {/* Profile picture */}
                  <img
                    src={review.profile_pic_url || '/default-avatar.png'}
                    alt={review.username}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />

                  {/* Review content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{review.username}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-1">{review.content}</p>
                    <div key={review.review_id} className="review-item mt-2">
                      <button
                        onClick={() => handleLike(review.review_id)}
                        className="flex items-center text-blue-500 hover:text-blue-700 transition-all"
                      > Like
                        <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                        <span className="text-sm font-medium">{review.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            )}
          </div>

          {/* Pagination controls */}
          <div className="pagination mt-4 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white py-2 px-4 rounded ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Toast popup */}
      {showToast && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-black text-white p-3 rounded shadow-lg transition-opacity duration-300 opacity-100">
          {book.title} is added to cart!
        </div>
      )}
    </div>

  );
};

export default ReviewBook;
