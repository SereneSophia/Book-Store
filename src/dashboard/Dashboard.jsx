import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../contects/AuthProvider";


const Dashboard = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    // Handlers for navigation
    const handleUploadBookClick = () => navigate('/admin/dashboard/upload');
    const handleManageBooksClick = () => navigate('/admin/dashboard/manage');
    const handleLogoutClick = () => navigate('/logout');

    return (
        <div className="dashboard-container grid grid-cols-1 md:grid-cols-3 gap-8 p-4 mt-16">
            {/* Left Column - 3 Divisions */}
            <div className="md:col-span-2 space-y-6">
                {/* Upper Division */}
                <div 
                    className="dashboard-section flex justify-between p-4 border rounded-lg cursor-pointer bg-teal-100 hover:bg-teal-200"
                    onClick={handleUploadBookClick}
                >
                    <div className="left">
                        <h2 className="text-lg font-semibold">Upload Books</h2>
                        <p>Click here to upload new books to the store</p>
                    </div>
                    <div className="right">
                        <img src="https://www.svgrepo.com/show/38513/book-with-upload-symbol.svg" alt="Upload" className="w-24 h-24" />
                    </div>
                </div>

                {/* Middle Division */}
                <div 
                    className="dashboard-section flex justify-between p-4 border rounded-lg cursor-pointer bg-teal-100 hover:bg-teal-200"
                    onClick={handleManageBooksClick}
                >
                    <div className="left">
                        <h2 className="text-lg font-semibold">Manage Books</h2>
                        <p>Click here to manage your book collection</p>
                    </div>
                    <div className="right items-center">
                        <img src="https://cdn0.iconfinder.com/data/icons/business-dual-color-glyph-set-6/128/settings_1-512.png" alt="Manage" className="w-24 h-24" />
                    </div>
                </div>

                {/* Lower Division */}
                <div 
                    className="dashboard-section flex justify-between p-4 border rounded-lg cursor-pointer bg-teal-100 hover:bg-teal-200"
                    onClick={handleLogoutClick}
                >
                    <div className="left">
                        <h2 className="text-lg font-semibold">Logout</h2>
                        <p>Click here to logout</p>
                    </div>
                    <div className="right items-center">
                        <img src="https://www.svgrepo.com/show/135250/logout.svg" alt="Logout" className="w-24 h-24 items-center" />
                    </div>
                </div>
            </div>

            {/* Right Column - User Information */}
            <div className="profile-section p-4 border lg:w-[300px] lg:h-[450px] rounded-lg bg-gray-300">
                <div className="cover-photo mb-4 w-full h-32 object-cover rounded-md">
                    {/*<img src="cover_photo_url" alt="Cover" className="w-full h-32 object-cover rounded-md" />*/}
                </div>
                <div className="profile-info flex flex-col items-center">
                    <div className="profile-photo mb-4 -mt-12">
                        <img src="https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="Profile" className="w-24 h-24 rounded-full border-2 border-teal-200" />
                    </div>
                    <h3 className="username text-lg font-semibold">
                        <p className="text-sm">
                        {
                            user?.displayName || "Demo User"
                        }
                        </p>
                    </h3>
                    <p className="email text-sm text-gray-500">
                        {
                            user?.email || "example@gmail.com"
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
