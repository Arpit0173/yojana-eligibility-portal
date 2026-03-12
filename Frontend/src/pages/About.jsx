import { useApp } from '../App'

export default function About() {
  const { t, lang } = useApp()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-navy to-navy/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{t.aboutTitle}</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-saffron/10 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">🏛️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
              <p className="text-saffron font-medium">{t.tagline}</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              {lang === 'en'
                ? 'The Yojana Eligibility Portal is a one-stop platform that helps Indian citizens discover and check their eligibility for various government schemes. Our mission is to bridge the information gap between the government and citizens.'
                : 'योजना पात्रता पोर्टल एक वन-स्टॉप प्लेटफॉर्म है जो भारतीय नागरिकों को विभिन्न सरकारी योजनाओं के लिए अपनी पात्रता की खोज और जांच करने में मदद करता है। हमारा मिशन सरकार और नागरिकों के बीच सूचना अंतर को पाटना है।'}
            </p>
            <p>
              {lang === 'en'
                ? 'With hundreds of schemes across categories like Agriculture, Education, Health, Women Welfare, Pensions, and Startups, finding the right scheme can be overwhelming. This portal simplifies the process with an intelligent eligibility engine.'
                : 'कृषि, शिक्षा, स्वास्थ्य, महिला कल्याण, पेंशन और स्टार्टअप जैसी श्रेणियों में सैकड़ों योजनाओं के साथ, सही योजना खोजना भारी हो सकता है। यह पोर्टल एक बुद्धिमान पात्रता इंजन के साथ प्रक्रिया को सरल बनाता है।'}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 py-6">
              {[
                { icon: '🎯', title: lang === 'en' ? 'Our Mission' : 'हमारा मिशन', desc: lang === 'en' ? 'Make government schemes accessible to every citizen' : 'हर नागरिक के लिए सरकारी योजनाएं सुलभ बनाना' },
                { icon: '👁️', title: lang === 'en' ? 'Our Vision' : 'हमारी दृष्टि', desc: lang === 'en' ? '100% awareness of government welfare programs' : 'सरकारी कल्याण कार्यक्रमों की 100% जागरूकता' },
                { icon: '💡', title: lang === 'en' ? 'Our Approach' : 'हमारा दृष्टिकोण', desc: lang === 'en' ? 'Technology-driven, citizen-centric portal' : 'प्रौद्योगिकी-संचालित, नागरिक-केंद्रित पोर्टल' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <p>
              {lang === 'en'
                ? 'This portal is part of the Digital India initiative, aimed at transforming India into a digitally empowered society and knowledge economy.'
                : 'यह पोर्टल डिजिटल इंडिया पहल का हिस्सा है, जिसका उद्देश्य भारत को डिजिटल रूप से सशक्त समाज और ज्ञान अर्थव्यवस्था में बदलना है।'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}