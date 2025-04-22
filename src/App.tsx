import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import IDGenerator from '@/pages/IDGenerator'
import EducationalDashboard from '@/pages/EducationalDashboard'
import NotFound from '@/pages/NotFound'
import Footer from '@/components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<IDGenerator />} />
            <Route path="/education" element={<EducationalDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
