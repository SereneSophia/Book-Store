import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// react icons
import { FaBlog, FaBarsStaggered, FaXmark, FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false); // Close the menu on larger screens
                setIsMobile(false);
            } else {
                setIsMobile(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Check if the current path is dashboard or one of its children
    const isDashboard = location.pathname.startsWith('/admin/dashboard');

    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Sell Your Book", path: "/admin/dashboard" },  // Updated path
        { link: <FaCartShopping  className='w-8 h-8'/>, path: "/cart" } // Replace "Cart" with cart icon
    ];

    return (
        <header className={`w-full ${isDashboard ? 'absolute bg-transparent z-0' : 'fixed top-0 left-0 right-0 bg-blue-300 z-10'} transition-all ease-in duration-300`}>
            <nav className='py-4 lg:px-24 px-4'>
                <div className='flex justify-between items-center text-base gap-8'>
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center'>
                        <FaBlog className='inline-block' />NonoBooks
                    </Link>

                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => (
                            <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                {link}
                            </Link>
                        ))}
                    </ul>

                    {isMobile && (
                        <div className='md:hidden'>
                            <button onClick={toggleMenu} className='text-black focus:outline-none'>
                                {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />}
                            </button>
                        </div>
                    )}

                    <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                        {navItems.map(({ link, path }) => (
                            <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer hover:text-blue-700'>
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
