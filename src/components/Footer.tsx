import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600">
              DocuVerify Pro is an open-source platform for advanced identity verification and fraud prevention.
              Our AI-powered tools help organizations combat online fraud through document verification,
              facial recognition, and behavioral analysis.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-gray-600 hover:text-primary-600">
                  Verification Tools
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername/docuverify-pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/yourusername/docuverify-pro/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername/docuverify-pro/pulls" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Submit Pull Requests
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername/docuverify-pro/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Join Discussions
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} DocuVerify Pro. Open Source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 