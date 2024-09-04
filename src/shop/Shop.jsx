import React, { useEffect, useState } from 'react';
import { Card, TextInput, Select } from "flowbite-react";
import { Link } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch("https://bookstore-project-essg.onrender.com/api/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleAddToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = [...existingCart, { title: book.title, price: book.price }];
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Book added to cart');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setDisplayedSearchTerm(searchTerm);
      setSearchTerm('');
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setDisplayedSearchTerm('');
  };

  const filteredBooks = books.filter(book => {
    const matchesSearchTerm =
      book.title.toLowerCase().includes(displayedSearchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(displayedSearchTerm.toLowerCase());

    const matchesGenre =
      filter === 'all' || book.genre.toLowerCase().includes(filter.toLowerCase());

    return matchesSearchTerm && matchesGenre;
  });

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className='text-5xl font-bold text-center'>All Books are here</h2>

      <div className="flex justify-between my-12">
        <TextInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search by title or author"
          className="w-full sm:w-2/3"
        />

        <Select
          className="ml-4"
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
          <option value="History">History</option>
          {/* Add more genres as needed */}
        </Select>
      </div>

      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3'>
        {
          filteredBooks.map(book => (
            <Card className="max-w-xs" key={book.id}>  {/* max-w-xs for smaller and consistent size */}
              <Link to={`/ReviewBook/${book.id}`}>
                <img src={book.image_url} alt={book.title} className='h-64 w-full object-cover' /> {/* h-64 for consistent image height */}
              </Link>
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white"> {/* text-lg for smaller title */}
                {book.title}
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-400">  {/* text-sm for smaller author name */}
                {book.author}
              </p>
              <button 
                onClick={() => handleAddToCart(book)} 
                className='bg-blue-700 font-semibold text-white py-2 rounded mt-2'>
                Add to cart
              </button>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default Shop;
