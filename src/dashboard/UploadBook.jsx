import React, { useState, useContext } from 'react';
import { Textarea } from "flowbite-react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { UserContext } from '../contects/UserContext';

const UploadBook = () => {
  const { user } = useContext(UserContext);
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Adult",
    "Crime",
    "Travel",
    "Religion",
    "Art and Design",
    "Education"
  ];

  const [selectedBookgenre, setSelectedBookgenre] = useState(bookCategories[0]);
  const [showPopup, setShowPopup] = useState(false); // For professional popup
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    image_url: '',
    price: '',
    description: ''
  });

  const handleChangeSelectedValue = (event) => {
    setSelectedBookgenre(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const { isbn, title, author, image_url, price, description } = formData;

    const bookObj = {
      isbn,
      title,
      author: [author], // Wrap in an array
      genre: [selectedBookgenre], // Already an array
      price,
      image_url,
      description,
      username: user?.username
    };

    fetch("https://bookstore-project-ues5.onrender.com/api/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(bookObj)
    })
      .then(res => res.json())
      .then(data => {
        setShowPopup(true); // Show popup
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        setFormData({
          isbn: '',
          title: '',
          author: '',
          image_url: '',
          price: '',
          description: ''
        }); // Clear form inputs
        setSelectedBookgenre(bookCategories[0]); // Reset genre to default
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to upload book.');
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload a Book</h2>

      {showPopup && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-black text-white p-3 rounded shadow-lg transition-opacity duration-300 opacity-100">
          Your book is uploaded successfully!
        </div>
      )}

      <form onSubmit={handleBookSubmit} className="flex lg:w-[980px] flex-col flex-wrap gap-4">
        {/* First row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput
              id="title"
              name='title'
              type="text"
              placeholder="Book Name"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author Name" />
            </div>
            <TextInput
              id="author"
              name='author'
              type="text"
              placeholder="Author Name"
              required
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="image_url" value="Book Image URL" />
            </div>
            <TextInput
              id="image_url"
              name='image_url'
              type="text"
              placeholder="Book Image URL"
              required
              value={formData.image_url}
              onChange={handleInputChange}
            />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Genre" />
            </div>
            <Select
              id="inputState"
              name='genreName'
              className='w-full rounded'
              value={selectedBookgenre}
              onChange={handleChangeSelectedValue}
            >
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>
        </div>
        {/* Third row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="isbn" value="Book ISBN" />
            </div>
            <TextInput
              id="isbn"
              name='isbn'
              type="text"
              placeholder="ISBN Number"
              required
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price" />
            </div>
            <TextInput
              id="price"
              name='price'
              type="number"
              placeholder="Book Price"
              required
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Book Description" />
          </div>
          <Textarea
            id="description"
            name='description'
            placeholder="Describe your book..."
            className='w-full'
            required
            rows={6}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className='mt-5'>Upload Book</Button>
      </form>
    </div>
  );
}

export default UploadBook;
