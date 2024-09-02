import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewBook = () => {
  const { id } = useParams();  // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details based on the ID
    fetch(`https://bookstore-project-essg.onrender.com/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <img src={book.image_url} alt={book.title} className='h-96'/>
      <h2 className='text-3xl font-bold'>{book.title}</h2>
      <p className='text-xl'>Author: {book.author}</p>
      <p className='text-lg'>Price: ${book.price}</p>
      <p className='mt-4'>{book.description}</p>  {/* Assuming book has a description field */}
    </div>
  );
}

export default ReviewBook;
