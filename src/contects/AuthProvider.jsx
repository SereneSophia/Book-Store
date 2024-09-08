// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data from your backend
        const fetchUser = async () => {
            const token = localStorage.getItem('token'); // assuming you're storing the JWT in localStorage

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:10000/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setUser(data); // Set the user state with fetched data
            } catch (error) {
                setError(error.message); // Set error message if there's an issue
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, error }}>
            {children}
        </UserContext.Provider>
    );
};
