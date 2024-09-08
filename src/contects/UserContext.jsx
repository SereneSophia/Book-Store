import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading starts as true

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check for token

        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('https://bookstore-project-ues5.onrender.com/api/user', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data); // Set user if token is valid
                    } else {
                        setUser(null); // Clear user if token is invalid
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
                setLoading(false); // Loading ends after fetching user
            };
            fetchUser();
        } else {
            setUser(null); // No token, no user
            setLoading(false); // Stop loading after checking token
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
