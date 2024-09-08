import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

import userImg from '../assets/profile.jpg'
import { useContext } from "react";
import { UserContext } from '../contects/UserContext';

const SideBar = () => {
  const {user} = useContext(UserContext);
  console.log(user)
  return (
    
      <Sidebar aria-label="Sidebar with content separator example" className="sticky top-0 h-screen">
        <Sidebar.Logo href="/" className="flex items-center space-x-3">
        <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-gray-300">
          <img
            src={user?.profilePicUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
            alt="User Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-sm font-semibold">
          {user ? user.username : "Demo User"}
        </p>
      </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineUpload}>
              Upload Books
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
              Manage Books
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/login" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="/logout" icon={HiTable}>
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/premium-subscription" icon={HiChartPie}>
              Upgrade to Pro
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Documentation
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiBuoy}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  
    
  )
}

export default SideBar