import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Search, Menu, X, ShoppingCart, Clock, ArrowRight } from 'lucide-react';

// --- Components ---

const AdPlaceholder = ({ className = "" }) => (
  <div className={`bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium p-4 text-center ${className}`}>
    Advertisement
  </div>
);

const NewsTicker = () => {
  const headlines = [
    "Pedri returns to training ahead of El Clásico",
    "Camp Nou renovation updates: New seating installed",
    "Lamine Yamal signs new long-term contract",
    "Transfer Rumors: Barça eyeing new defensive midfielder"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="bg-[#A50044] text-white text-xs sm:text-sm py-2 px-4 flex items-center overflow-hidden">
      <span className="font-bold uppercase tracking-wider mr-4 shrink-0 bg-white text-[#A50044] px-2 py-0.5 rounded-sm">Breaking</span>
      <div className="truncate animate-fade-in transition-opacity duration-500" key={currentIndex}>
        {headlines[currentIndex]}
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <NewsTicker />
      <nav className="bg-[#004D98] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="font-bold text-2xl tracking-tighter">BARÇA<span className="text-[#A50044]">NEWS</span></span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="hover:text-gray-300 transition-colors font-medium">News</a>
              <a href="#" className="hover:text-gray-300 transition-colors font-medium">Transfers</a>
              <a href="#" className="hover:text-gray-300 transition-colors font-medium">Matches</a>
              <a href="#" className="hover:text-gray-300 transition-colors font-medium">Shop</a>
              <button className="text-white hover:text-gray-300"><Search size={20} /></button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#003b75] px-4 pt-2 pb-4 space-y-2">
            <a href="#" className="block py-2 hover:bg-[#004D98] rounded px-2">News</a>
            <a href="#" className="block py-2 hover:bg-[#004D98] rounded px-2">Transfers</a>
            <a href="#" className="block py-2 hover:bg-[#004D98] rounded px-2">Matches</a>
            <a href="#" className="block py-2 hover:bg-[#004D98] rounded px-2">Shop</a>
          </div>
        )}
      </nav>
    </header>
  );
};

const LeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    // Simulate webhook POST
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border-t-4 border-[#A50044]">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Get the Starting XI 1 Hour Before Kickoff</h3>
      <p className="text-gray-600 mb-6">Join 50,000+ Culés. No spam, just pure Barça news.</p>
      
      {status === 'success' ? (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 font-medium text-center">
          Visca el Barça! You're on the list.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={`w-full px-4 py-3 rounded-lg border ${status === 'error' ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#004D98]`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            />
            {status === 'error' && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-[#004D98] hover:bg-[#003b75] text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
          >
            {status === 'loading' ? 'Joining...' : 'Join the Club'}
          </button>
        </form>
      )}
      <p className="text-xs text-gray-400 mt-4 text-center">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Featured Article */}
        <div className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="https://picsum.photos/seed/yamal/1200/800" 
            alt="Lamine Yamal" 
            className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="bg-[#A50044] text-white text-xs font-bold uppercase px-3 py-1 rounded-full w-max mb-4">Exclusive</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 group-hover:text-gray-200 transition-colors">
              Latest on Lamine Yamal: The Rising Star's Impact on the New Era
            </h1>
            <p className="text-gray-300 text-sm sm:text-base line-clamp-2 md:line-clamp-none max-w-2xl">
              Analyzing the tactical shifts and the incredible maturity shown by the young winger in recent crucial fixtures.
            </p>
          </div>
        </div>

        {/* Lead Magnet */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <LeadMagnet />
          <AdPlaceholder className="h-[250px] rounded-xl" />
        </div>
      </div>
    </section>
  );
};

const NextMatch = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set target to next Saturday at 20:00
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + (6 - targetDate.getDay() + 7) % 7);
    targetDate.setHours(20, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-2xl overflow-hidden bg-[#004D98] text-white shadow-2xl">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#A50044] opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm bg-white/5 border border-white/10">
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-200 mb-2 flex items-center justify-center md:justify-start gap-2">
              <Clock size={16} /> Next Fixture
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-6 text-2xl sm:text-4xl font-bold">
              <span>FC Barcelona</span>
              <span className="text-gray-400 text-xl">VS</span>
              <span>Real Madrid</span>
            </div>
            <p className="text-blue-200 mt-2 text-sm">La Liga • Spotify Camp Nou</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3 text-center">
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-xs text-blue-200 uppercase">Days</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-blue-200 uppercase">Hours</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-blue-200 uppercase">Mins</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-blue-200 uppercase">Secs</div>
              </div>
            </div>
            <button className="w-full bg-[#A50044] hover:bg-[#8a0039] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Predict the Score & Win <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

const TrendingFacebook = () => {
  const posts = [
    { id: 1, text: "What a performance by the midfield today! Rate it out of 10. 👇", likes: "12K", comments: "842", img: "https://picsum.photos/seed/midfield/400/300" },
    { id: 2, text: "Injury update: Araujo expected to be back sooner than expected. Massive boost! 💪", likes: "24K", comments: "1.2K", img: "https://picsum.photos/seed/araujo/400/300" },
    { id: 3, text: "Who should start on the left wing next match? Let us know your thoughts.", likes: "8.5K", comments: "2.1K", img: "https://picsum.photos/seed/wing/400/300" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Facebook className="text-blue-600" /> Trending on Facebook
        </h2>
        <a href="#" className="text-[#004D98] font-medium hover:underline text-sm">View Fan Page</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img src={post.img} alt="Post image" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <div className="p-4">
              <p className="text-gray-800 mb-4 line-clamp-3">{post.text}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                <span className="flex items-center gap-1">👍 {post.likes}</span>
                <span className="flex items-center gap-1">💬 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AffiliateWidget = () => {
  const products = [
    { id: 1, name: "Official Home Kit 25/26", price: "€95.00", img: "https://picsum.photos/seed/kit/200/200" },
    { id: 2, name: "Training Top - Navy", price: "€55.00", img: "https://picsum.photos/seed/training/200/200" },
    { id: 3, name: "Retro 1999 Jersey", price: "€85.00", img: "https://picsum.photos/seed/retro/200/200" },
    { id: 4, name: "Barça Scarf", price: "€25.00", img: "https://picsum.photos/seed/scarf/200/200" },
  ];

  return (
    <section className="bg-gray-100 py-12 mt-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShoppingCart className="text-[#A50044]" /> Shop the Look
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer text-center">
              <img src={product.img} alt={product.name} className="w-full aspect-square object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
              <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">{product.name}</h3>
              <p className="text-[#A50044] font-bold">{product.price}</p>
              <button className="mt-3 w-full border border-[#004D98] text-[#004D98] hover:bg-[#004D98] hover:text-white text-sm font-medium py-2 rounded transition-colors">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 text-center">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center space-x-6 mb-8">
        <a href="#" className="hover:text-white"><Facebook /></a>
        <a href="#" className="hover:text-white"><Twitter /></a>
        <a href="#" className="hover:text-white"><Instagram /></a>
      </div>
      <p className="mb-4">© 2026 Barça News. This is an unofficial fan site and is not affiliated with FC Barcelona.</p>
      <div className="space-x-4 text-sm">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
        <a href="#" className="hover:text-white">Contact</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdPlaceholder className="h-[90px] w-full max-w-3xl mx-auto rounded-lg" />
        </div>

        <NextMatch />
        <TrendingFacebook />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdPlaceholder className="h-[90px] w-full max-w-3xl mx-auto rounded-lg" />
        </div>

        <AffiliateWidget />
      </main>

      <Footer />
    </div>
  );
}
