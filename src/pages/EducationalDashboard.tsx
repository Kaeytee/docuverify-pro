import { useState } from "react";
import { ShieldCheckIcon, DocumentCheckIcon, EyeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const EducationalDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: DocumentCheckIcon },
    { id: "security-features", label: "Security Features", icon: ShieldCheckIcon },
    { id: "fraud-prevention", label: "Fraud Prevention", icon: EyeIcon },
    { id: "resources", label: "Resources", icon: MagnifyingGlassIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Document Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Modern identification documents incorporate multiple layers of security features combining 
                physical and digital elements to prevent counterfeiting and fraud. These sophisticated 
                measures are designed to enable both human verification and machine authentication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold text-lg mb-3 text-blue-600">Physical Security Features</h4>
                <ul className="space-y-3">
                  {['Holograms & OVDs', 'Security Paper & Watermarks', 'Microprinting', 'UV/IR Reactive Inks', 'Guilloche Patterns'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold text-lg mb-3 text-green-600">Digital Security Features</h4>
                <ul className="space-y-3">
                  {['2D/QR Barcodes', 'RFID/NFC Chips', 'Digital Signatures', 'Biometric Data', 'Machine Readable Zones'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-green-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case "security-features":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Security Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-purple-600">Physical Protection Layers</h4>
                  <div className="space-y-3">
                    {['Optically Variable Ink', 'Laser Perforations', 'Transparent Windows', 'Tactile Features', 'Color-Shifting Elements'].map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-start">
                        <ShieldCheckIcon className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-teal-600">Digital Security Measures</h4>
                  <div className="space-y-3">
                    {['Blockchain Verification', 'Biometric Matching', 'Encrypted Data Chips', 'Dynamic QR Codes', 'Blockchain Verification'].map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-start">
                        <DocumentCheckIcon className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "fraud-prevention":
        return (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fraud Prevention Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-red-600">Verification Protocols</h4>
                  <ul className="space-y-3">
                    {['Multi-spectral Analysis', 'Digital Signature Validation', 'Biometric Authentication', 'Blockchain Verification'].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-3 text-red-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-orange-600">Operational Best Practices</h4>
                  <ul className="space-y-3">
                    {['Staff Training Programs', 'Multi-factor Verification', 'Real-time Validation Systems', 'Incident Reporting Protocols'].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-3 text-orange-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "resources":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-indigo-600">Technical Documentation</h4>
                  <div className="space-y-3">
                    {['ICAO 9303 Standards', 'ISO/IEC 7810 Specifications', 'Biometric Data Guidelines', 'RFID Implementation Handbook'].map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-cyan-600">Training Materials</h4>
                  <div className="space-y-3">
                    {['Advanced Verification Course', 'Fraud Detection Webinars', 'Case Study Repository', 'Interactive Training Modules'].map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
          <nav className="flex overflow-x-auto px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-8">
          {renderContent()}

          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Feature Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Barcode Verification',
                  icon: DocumentCheckIcon,
                  color: 'text-blue-600',
                  items: {
                    'Fraud Techniques': ['Simple replication', 'Data manipulation', 'Poor quality'],
                    'Detection Methods': ['Checksum validation', 'Data consistency', 'Quality analysis']
                  }
                },
                {
                  title: 'MRZ Security',
                  icon: ShieldCheckIcon,
                  color: 'text-green-600',
                  items: {
                    'Fraud Techniques': ['Data manipulation', 'Format issues', 'Check digit forgery'],
                    'Detection Methods': ['Format validation', 'Digit verification', 'Data cross-check']
                  }
                },
                {
                  title: 'Holographic Features',
                  icon: EyeIcon,
                  color: 'text-purple-600',
                  items: {
                    'Fraud Techniques': ['Low-quality replication', 'Missing elements', 'Placement errors'],
                    'Detection Methods': ['Visual inspection', 'Pattern analysis', 'UV verification']
                  }
                },
                {
                  title: 'Microtext Analysis',
                  icon: MagnifyingGlassIcon,
                  color: 'text-orange-600',
                  items: {
                    'Fraud Techniques': ['Blurred text', 'Font mismatch', 'Print quality'],
                    'Detection Methods': ['Magnification check', 'Pattern recognition', 'Ink analysis']
                  }
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className={`mb-4 ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <div className="space-y-4">
                    {Object.entries(feature.items).map(([category, items]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">{category}</h4>
                        <ul className="space-y-1">
                          {items.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EducationalDashboard;