import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contects/UserContext';

const ManageBooks = () => {
    const { user } = useContext(UserContext);
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const admins = ['Admin1', 'Admin2', 'Admin3'];

    useEffect(() => {
        fetch("https://bookstore-project-ues5.onrender.com/api/books")
            .then(res => res.json())
            .then(data => {
                setAllBooks(data);
                if (admins.includes(user?.username)) {
                    setFilteredBooks(data); // Show all books for admin users
                } else {
                    const userBooks = data.filter(book => book.username === user?.username);
                    setFilteredBooks(userBooks);
                }
            });
    }, [user]);

    const handleDelete = (id) => {
        const updatedBooks = filteredBooks.filter(book => book.id !== id);
        setFilteredBooks(updatedBooks);

        fetch(`https://bookstore-project-ues5.onrender.com/api/books/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    setPopupMessage('Failed to delete the book. Please try again.');
                    setFilteredBooks([...filteredBooks]);
                } else {
                    setPopupMessage('Book is deleted successfully');
                }
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                setPopupMessage('An error occurred while deleting the book.');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
                setFilteredBooks([...filteredBooks]);
            });
    };

    return (
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Manage Your Book</h2>

            <Table className="lg:w-[980px]">
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Book Name</Table.HeadCell>
                    <Table.HeadCell>Author Name</Table.HeadCell>
                    <Table.HeadCell>Genre</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Edit or Manage</Table.HeadCell>
                </Table.Head>
                {
                    filteredBooks.map((book, index) => (
                        <Table.Body className="divide-y" key={book.id}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {book.title}
                                </Table.Cell>
                                <Table.Cell>{book.author}</Table.Cell>
                                <Table.Cell>{book.genre}</Table.Cell>
                                <Table.Cell>{book.price}</Table.Cell>
                                <Table.Cell>
                                    <Link
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                                        to={`/admin/dashboard/edit-allBooks/${book.id}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                                    >
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))
                }
            </Table>

            {showPopup && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-black text-white p-3 rounded shadow-lg transition-opacity duration-300 opacity-100">
                    {popupMessage}
                </div>
            )}
        </div>
    );
};

export default ManageBooks;
