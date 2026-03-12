import { useState, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schemes from './pages/Schemes'
import Eligibility from './pages/Eligibility'
import Upcoming from './pages/Upcoming'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

const translations = {
  en: {
    title: 'Yojana Eligibility Portal',
    tagline: 'Find Your Eligibility for All Government Schemes',
    home: 'Home', schemes: 'Schemes', eligibility: 'Eligibility Checker',
    upcoming: 'Upcoming Schemes', about: 'About', contact: 'Contact',
    heroTitle: 'Check Your Eligibility for Government Schemes',
    heroSub: 'Enter your details below and find all schemes you qualify for',
    age: 'Age', income: 'Annual Income (₹)', state: 'State',
    category: 'Category', gender: 'Gender', checkBtn: 'Check Eligibility',
    latestSchemes: 'Latest Schemes', upcomingSchemes: 'Upcoming Schemes',
    popularSchemes: 'Popular Schemes', viewDetails: 'View Details',
    schemeCategories: 'Scheme Categories', allSchemes: 'All Government Schemes',
    searchPlaceholder: 'Search schemes...', filterByCategory: 'Filter by Category',
    filterByState: 'Filter by State', noSchemes: 'No schemes found',
    eligible: 'Eligible Schemes', youQualify: 'You qualify for',
    schemesFound: 'schemes', backToHome: 'Back to Home',
    adminPanel: 'Admin Panel', addScheme: 'Add Scheme', editScheme: 'Edit Scheme',
    deleteScheme: 'Delete', save: 'Save', cancel: 'Cancel',
    pension: 'Pension', agriculture: 'Agriculture', education: 'Education',
    womenWelfare: 'Women Welfare', startup: 'Startup', health: 'Health',
    quickLinks: 'Quick Links', resources: 'Resources',
    importantLinks: 'Important Links', contactInfo: 'Contact',
    copyright: '© 2024 Yojana Eligibility Portal. Government of India.',
    aboutTitle: 'About Yojana Eligibility Portal',
    contactTitle: 'Contact Us', helpline: 'Helpline',
    loading: 'Loading...', active: 'Active', closed: 'Closed',
    results: 'Results', ministry: 'Ministry', benefits: 'Benefits',
    launchDate: 'Launch Date', status: 'Status',
  },
  hi: {
    title: 'योजना पात्रता पोर्टल',
    tagline: 'सभी सरकारी योजनाओं के लिए अपनी पात्रता जानें',
    home: 'होम', schemes: 'योजनाएं', eligibility: 'पात्रता जांचें',
    upcoming: 'आगामी योजनाएं', about: 'हमारे बारे में', contact: 'संपर्क करें',
    heroTitle: 'सरकारी योजनाओं के लिए अपनी पात्रता जांचें',
    heroSub: 'नीचे अपना विवरण दर्ज करें और सभी योजनाएं जानें जिनके लिए आप पात्र हैं',
    age: 'आयु', income: 'वार्षिक आय (₹)', state: 'राज्य',
    category: 'श्रेणी', gender: 'लिंग', checkBtn: 'पात्रता जांचें',
    latestSchemes: 'नवीनतम योजनाएं', upcomingSchemes: 'आगामी योजनाएं',
    popularSchemes: 'लोकप्रिय योजनाएं', viewDetails: 'विवरण देखें',
    schemeCategories: 'योजना श्रेणियां', allSchemes: 'सभी सरकारी योजनाएं',
    searchPlaceholder: 'योजनाएं खोजें...', filterByCategory: 'श्रेणी से फ़िल्टर',
    filterByState: 'राज्य से फ़िल्टर', noSchemes: 'कोई योजना नहीं मिली',
    eligible: 'पात्र योजनाएं', youQualify: 'आप पात्र हैं',
    schemesFound: 'योजनाओं के लिए', backToHome: 'होम पर वापस',
    adminPanel: 'व्यवस्थापक पैनल', addScheme: 'योजना जोड़ें', editScheme: 'योजना संपादित करें',
    deleteScheme: 'हटाएं', save: 'सहेजें', cancel: 'रद्द करें',
    pension: 'पेंशन', agriculture: 'कृषि', education: 'शिक्षा',
    womenWelfare: 'महिला कल्याण', startup: 'स्टार्टअप', health: 'स्वास्थ्य',
    quickLinks: 'त्वरित लिंक', resources: 'संसाधन',
    importantLinks: 'महत्वपूर्ण लिंक', contactInfo: 'संपर्क',
    copyright: '© 2024 योजना पात्रता पोर्टल। भारत सरकार।',
    aboutTitle: 'योजना पात्रता पोर्टल के बारे में',
    contactTitle: 'संपर्क करें', helpline: 'हेल्पलाइन',
    loading: 'लोड हो रहा है...', active: 'सक्रिय', closed: 'बंद',
    results: 'परिणाम', ministry: 'मंत्रालय', benefits: 'लाभ',
    launchDate: 'लॉन्च तिथि', status: 'स्थिति',
  }
}

export const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export default function App() {
  const [lang, setLang] = useState('en')
  const [dark, setDark] = useState(false)
  const t = translations[lang]

  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en')
  const toggleDark = () => setDark(d => !d)

  return (
    <AppContext.Provider value={{ lang, t, toggleLang, dark, toggleDark }}>
      <div className={dark ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </AppContext.Provider>
  )
}