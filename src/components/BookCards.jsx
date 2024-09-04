import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaCartShopping } from 'react-icons/fa6';

// Import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '380px', // Adjust height as needed
  width: '180px',  // Adjust width as needed
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#e6e4e4',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #ddd', // Border added here
};

const imageStyle = {
  width: '100%',
  height: '300px', // Adjust height as needed
  objectFit: 'cover',
};

const overlayStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'rgba(0, 0, 255, 0.6)', // Default background color
  padding: '8px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer', // Ensure the cursor shows as pointer to indicate it's clickable
  transition: 'background-color 0.3s ease', // Smooth transition
};

const infoStyle = {
  padding: '10px',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const authorStyle = {
  fontSize: '14px',
  color: '#555',
  margin: '0',
};

const priceStyle = {
  fontSize: '14px',
  color: '#333',
  margin: '5px 0 0',
};

const BookCards = ({ headline, books }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>

      {/* cards */}
      <div className='mt-12'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {books.map((book, index) => (
            <SwiperSlide key={book.id}>
              <Link to={`/ReviewBook/${book.id}`}>
                <div style={cardStyle}>
                  <img src={book.image_url} alt={book.title} style={imageStyle} />
                  <div
                    style={{
                      ...overlayStyle,
                      backgroundColor: hoveredIndex === index ? 'rgba(0, 0, 255, 0.6)' : 'rgba(0, 0, 255, 0.6)', // Base background color
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <FaCartShopping
                      className='w-6 h-6'
                      style={{ color: hoveredIndex === index ? 'orange' : 'white', transition: 'color 0.3s ease' }} // Change icon color on hover
                    />
                  </div>
                  <div style={infoStyle}>
                    <h3 style={titleStyle}>{book.title}</h3>
                    <p style={authorStyle}>{book.author}</p>
                    <p style={priceStyle}>Ks.{book.price}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BookCards;
