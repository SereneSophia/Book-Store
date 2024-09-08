import React, { useState, useEffect, useRef } from 'react';
import { FaFacebook, FaPhone, FaTelegram, FaEllipsisV } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Aung Khant Thaw',
    role: 'Project Manager, Full Stack Developer',
    image: 'https://static.vecteezy.com/system/resources/previews/019/494/939/large_2x/artist-man-boy-avatar-user-person-people-glasses-blue-colored-outline-style-vector.jpg',
    facebook: 'https://facebook.com/alice',
    phone: '+95 9950133441',
    telegram: 'https://telegram.me/AungKhantThaw373'
  },
  {
    id: 2,
    name: 'Zin Phyo Nyi',
    role: 'Front End Developer',
    image: 'https://static.vecteezy.com/system/resources/previews/013/593/971/large_2x/the-smiling-boy-avatar-free-vector.jpg',
    facebook: 'https://facebook.com/bob',
    phone: '+95 9792595598',
    telegram: 'https://telegram.me/zinphyonyi'
  },
  {
    id: 3,
    name: 'Shin Thant Aung',
    role: 'UI/UX Designer, Full Stack Developer',
    image: 'https://static.vecteezy.com/system/resources/previews/019/494/943/non_2x/business-man-boy-avatar-user-person-people-necktie-shirt-colored-outline-style-vector.jpg',
    facebook: 'https://facebook.com/dana',
    phone: '+95 9798961856',
    telegram: 'https://telegram.me/Faling_inluvwith_thlngl_chokchok'
  },
  {
    id: 4,
    name: 'Kyaw Thein Tun',
    role: 'Front End Developer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSic5z5Q2QyOXqetH7rUZ6QCRRKYK1s3_2zmg&s',
    facebook: 'https://facebook.com/dana',
    phone: '+987654123',
    telegram: 'https://telegram.me/kyaw_thein_tun'
  },
  {
    id: 5,
    name: 'Shine Wunna Htune',
    role: 'Front End Developer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXXp6HosNQ0_9QdhlKvG-GjGlQ4McllzEFMQ&s',
    facebook: 'https://facebook.com/dana',
    phone: '+987654123',
    telegram: 'https://telegram.me/ashonlyone'
  },
  {
    id: 6,
    name: 'Aung Chan Myae',
    role: 'UI/UX Designer, Content Writer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojY38tP9lrpXQACUMjeIafjkfeXxSSm3bXw&s',
    facebook: 'https://facebook.com/dana',
    phone: '+987654123',
    telegram: 'https://telegram.me/grimm_12'
  }
];

const cardContainerStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '250px',
  position: 'relative',
  backgroundColor: '#fff',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  position: 'relative',
};

const imageStyle = {
  borderRadius: '50%',
  width: '150px',
  height: '150px',
  marginBottom: '15px',
};

const popupStyle = {
  width: "270px",
  position: 'absolute',
  top: '45%', // Closer to the image
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(5, 5, 5, 0.9)',
  padding: '40px',  // Much bigger padding for a larger pop-up
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  color: '#fff',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',  // Increased margin for larger icons and text
  fontSize: '20px', // Increase the font size
};

const iconTextStyle = {
  marginLeft: '15px',
  color: '#fff',
};

const threeDotsStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [pendingClose, setPendingClose] = useState(false); // New state to manage pending close
  const popUpRef = useRef();

  const handleTogglePopup = (index) => {
    if (pendingClose) {
      setPendingClose(false); // Reset pending close if toggling
      return;
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setActiveIndex(null);
      setPendingClose(true); // Set pending close state
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', padding: '140px' }} className="bg-teal-100">
      {teamMembers.map((member, index) => (
        <div key={member.id} style={cardContainerStyle}>
          <div style={cardStyle}>
            <img src={member.image} alt={member.name} style={imageStyle} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <FaEllipsisV
              style={threeDotsStyle}
              onClick={() => handleTogglePopup(index)}
            />
          </div>
          {activeIndex === index && (
            <div style={popupStyle} ref={popUpRef}>
              <div style={iconStyle}>
                <FaFacebook color="#3b5998" />
                <a href={member.facebook} target="_blank" rel="noopener noreferrer" style={iconTextStyle}>Facebook</a>
              </div>
              <div style={iconStyle}>
                <FaPhone color="#25d366" />
                <span style={iconTextStyle}>{member.phone}</span>
              </div>
              <div style={iconStyle}>
                <FaTelegram color="#0088cc" />
                <a href={member.telegram} target="_blank" rel="noopener noreferrer" style={iconTextStyle}>Telegram</a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
