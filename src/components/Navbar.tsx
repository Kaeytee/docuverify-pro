import React from 'react'
import { Link } from 'react-router-dom'
import { AcademicCapIcon, HomeIcon } from '@heroicons/react/24/outline'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/logo.png" alt="DocuVerify Pro Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-900">DocuVerify Pro</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600">
              <HomeIcon className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link to="/generator" className="flex items-center text-gray-600 hover:text-primary-600">
              <AcademicCapIcon className="h-5 w-5 mr-1" />
              Verification Tools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 