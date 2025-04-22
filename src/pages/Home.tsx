import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  DocumentMagnifyingGlassIcon,
  FaceSmileIcon,
  BanknotesIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'url("/home.svg")',
        backgroundRepeat: 'repeat',
        backgroundSize: '500px 500px',
        pointerEvents: 'none'
      }} />
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8 flex justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <img src="/logo.png" alt="DocuVerify Pro Logo" className="h-16 w-auto" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Building Smarter Verification Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Advanced identity verification and fraud prevention platform powered by AI and machine learning
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Comprehensive Verification System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: DocumentMagnifyingGlassIcon,
                  title: "Document Verification",
                  description: "Advanced OCR and image analysis to detect altered or fake ID documents"
                },
                {
                  icon: FaceSmileIcon,
                  title: "Facial Recognition",
                  description: "Real-time selfie matching with ID photos for secure identity verification"
                },
                {
                  icon: BanknotesIcon,
                  title: "Bank Account Analysis",
                  description: "Detection of synthetic or suspicious bank account signups"
                },
                {
                  icon: UserGroupIcon,
                  title: "Bot Prevention",
                  description: "Advanced detection of bot activity and abuse of temporary credentials"
                },
                {
                  icon: ChartBarIcon,
                  title: "Behavior Analysis",
                  description: "AI-powered risk scoring based on user behavior patterns"
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Security Framework",
                  description: "Enterprise-grade security measures to protect user data"
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="max-w-7xl mx-auto py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "React", color: "text-blue-600" },
                { name: "Node.js", color: "text-green-600" },
                { name: "Face API", color: "text-purple-600" },
                { name: "Tailwind CSS", color: "text-cyan-600" },
                { name: "OCR", color: "text-orange-600" },
                { name: "AI/ML", color: "text-red-600" },
                { name: "TypeScript", color: "text-blue-500" },
                { name: "REST API", color: "text-indigo-600" }
              ].map((tech, idx) => (
                <div key={idx} className="text-center">
                  <span className={`text-lg font-semibold ${tech.color}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Open Source Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Help us build smarter verification tools and make digital spaces more secure
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/generator"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Our Tools
            </Link>
            <a
              href="https://github.com/yourusername/docuverify-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;