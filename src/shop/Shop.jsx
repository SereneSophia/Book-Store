import React, { useState, useEffect } from 'react';
import { Card, TextInput, Select } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1); // To track the current page
  const booksPerPage = 25; // 25 books per page (5 rows of 5 books)
  const location = useLocation();

  useEffect(() => {
    // Fetch books when the component loads
    fetch("https://bookstore-project-ues5.onrender.com/api/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  useEffect(() => {
    // Parse the query params when the page loads
    const params = new URLSearchParams(location.search);
    const author = params.get('author');
    const genre = params.get('genre');

    if (author) {
      setSearchTerm(author);
    }
    if (genre) {
      setFilter(genre);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleAddToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${book.title} has been added to your cart.`);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearchTerm =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      filter === 'all' || book.genre.toLowerCase().includes(filter.toLowerCase());

    return matchesSearchTerm && matchesGenre;
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
  <h2 className='text-4xl font-bold text-center mb-8'>All Books</h2>

  <div className="flex justify-between my-12">
    <TextInput
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search by title or author"
      className="w-full sm:w-2/3"
    />

    <Select
      className="ml-4 w-full sm:w-1/3 lg:w-1/4"
      value={filter}
      onChange={handleFilter}
    >
      <option value="all">All Categories</option>
      <option value="fiction">Fiction</option>
      <option value="nonfiction">Non-Fiction</option>
      <option value="mystery">Mystery</option>
      <option value="fantasy">Fantasy</option>
      <option value="comedy">Comedy</option>
      <option value="romance">Romance</option>
      <option value="horror">Horror</option>
      <option value="adventure">Adventure</option>
    </Select>
  </div>

  <div className='grid gap-8 my-12 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3'>
    {currentBooks.map(book => (
      <Card
        className="flex flex-col items-center justify-between w-full h-full bg-white shadow-lg"
        key={book.id}
        style={{ height: '450px' }} // Fixed height for all cards
      >
        <Link to={`/reviewbook/${book.id}`} className="w-full h-3/4">
          <img
            src={book.image_url}
            alt={book.title}
            className="w-full h-full object-cover"
            style={{ height: '280px' }} // Set a fixed height for all images
          />
        </Link>
        <div className="flex flex-col items-start justify-start w-full h-1/4">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {book.title}
          </h5>
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
            {book.author}
          </p>
          <button
            className='w-full bg-blue-500 font-semibold text-white py-2 rounded hover:bg-blue-700'
            onClick={() => handleAddToCart(book)}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    ))}
  </div>

  {/* Pagination */}
  <div className="flex justify-center mt-8">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === index + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>
</div>

  );
}

export default Shop;
