import React, { useState, useEffect } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const initialQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success",
    bio: "American entrepreneur and co-founder of Apple Inc.",
    born: "February 24, 1955",
    profession: "Entrepreneur, Inventor",
    known: "Apple, Pixar, iPhone, iPad"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    bio: "English singer, songwriter, and peace activist.",
    born: "October 9, 1940",
    profession: "Musician, Activist",
    known: "The Beatles, Imagine"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation",
    bio: "American political figure, diplomat, and activist.",
    born: "October 11, 1884",
    profession: "First Lady, Diplomat",
    known: "Human rights advocacy"
  },
  {
    text: "It is never too late to be what you might have been.",
    author: "George Eliot",
    category: "inspiration",
    bio: "English novelist, poet, journalist, and translator.",
    born: "November 22, 1819",
    profession: "Writer",
    known: "Middlemarch, Silas Marner"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
    bio: "British statesman, army officer, and writer.",
    born: "November 30, 1874",
    profession: "Politician, Writer",
    known: "WWII leadership, Nobel Prize in Literature"
  },
  {
    text: "The only thing we have to fear is fear itself.",
    author: "Franklin D. Roosevelt",
    category: "courage",
    bio: "American statesman and political leader.",
    born: "January 30, 1882",
    profession: "Politician",
    known: "32nd U.S. President, New Deal"
  }
];

const fontMap = {
  default: '',
  serif: 'Georgia, serif',
  dyslexic: 'Comic Sans MS, OpenDyslexic, sans-serif'
};

function App() {
  const [quotes] = useState(initialQuotes);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [quoteCount, setQuoteCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(new Set(initialQuotes.map(q => q.author)).size);
  const [theme, setTheme] = useState('nature');
  const [font, setFont] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('quoteAppSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTheme(settings.theme || 'nature');
      setFont(settings.font || 'default');
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('quoteAppSettings', JSON.stringify({ theme, font }));
  }, [theme, font]);

  useEffect(() => {
    // Set body class for theme
    document.body.className = '';
    if (theme !== 'default') {
      document.body.classList.add(`${theme}-bg`);
    }
  }, [theme]);

  const generateNewQuote = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIndex(randomIndex);
    setQuoteCount(qc => qc + 1);
  };

  const addToFavorites = () => {
    const currentQuote = quotes[currentQuoteIndex];
    if (!favorites.some(fav => fav.text === currentQuote.text)) {
      setFavorites([...favorites, currentQuote]);
    }
  };

  const shareQuote = () => {
    const quote = quotes[currentQuoteIndex];
    const text = `${quote.text} - ${quote.author}`;
    if (navigator.share) {
      navigator.share({
        title: 'Inspirational Quote',
        text: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      window.prompt('Copy and share this quote:', text);
    }
  };

  const flipCard = () => {
    setFlip(false);
    setTimeout(() => setFlip(true), 10);
    setTimeout(() => setFlip(false), 800);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleFontChange = (font) => {
    setFont(font);
  };

  const showAuthorInfo = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="container">
      <header>
        <div className="logo">
          <i className="fas fa-quote-left"></i>
          <h1>ZenQuote</h1>
        </div>
        <p className="subtitle">Discover wisdom, inspiration, and motivation with every click</p>
      </header>
      <main>
        <div className={`card animate-up${flip ? ' flip-card' : ''}`}> 
          <div className="quote-container">
            <div className="quote-text" id="quoteText" style={{ fontFamily: fontMap[font] }}>
              {currentQuote.text}
            </div>
            <div className="quote-author">
              — <span className="author-link" id="authorName" onClick={showAuthorInfo}>{currentQuote.author}</span>
            </div>
          </div>
          <div className="controls">
            <button className="btn" id="newQuoteBtn" onClick={generateNewQuote}>
              <i className="fas fa-sync-alt"></i> New Quote
            </button>
            <button className="btn btn-success" id="favoriteBtn" onClick={addToFavorites}>
              <i className="fas fa-heart"></i> Favorite
            </button>
            <button className="btn btn-outline" id="shareBtn" onClick={shareQuote}>
              <i className="fas fa-share-alt"></i> Share
            </button>
            <button className="btn btn-warning" id="flipBtn" onClick={flipCard}>
              <i className="fas fa-sync"></i> Flip Card
            </button>
          </div>
        </div>
        <div className="customization card animate-up animate-delay-1">
          <h2><i className="fas fa-palette"></i> Customize Your Experience</h2>
          <div className="customization-options">
            <div className="option-group">
              <div className="option-label">Background Theme</div>
              <select id="themeSelect" value={theme} onChange={handleThemeChange}>
                <option value="nature">Nature</option>
                <option value="space">Space</option>
                <option value="abstract">Abstract</option>
                <option value="default">Default Gradient</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>
            <div className="option-group">
              <div className="option-label">Font Style</div>
              <div>
                <span className={`font-option${font === 'default' ? ' active' : ''}`} data-font="default" onClick={() => handleFontChange('default')}>Default</span>
                <span className={`font-option${font === 'serif' ? ' active' : ''}`} data-font="serif" onClick={() => handleFontChange('serif')}>Serif</span>
                <span className={`font-option${font === 'dyslexic' ? ' active' : ''}`} data-font="dyslexic" onClick={() => handleFontChange('dyslexic')}>Dyslexic</span>
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat-item">
              <div className="stat-value" id="quoteCount">{quoteCount}</div>
              <div className="stat-label">Quotes Generated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" id="favoriteCount">{favorites.length}</div>
              <div className="stat-label">Favorites</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" id="authorCount">{authorCount}</div>
              <div className="stat-label">Authors</div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>ZenQuote &copy; 2023 | A showcase of creativity and technical excellence</p>
        <div className="footer-links">
          <a href="#"><i className="fab fa-github"></i> GitHub</a>
          <a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a>
          <a href="#"><i className="fas fa-code"></i> Documentation</a>
        </div>
      </footer>
      {/* Author Modal */}
      {showModal && (
        <div className="author-modal show" id="authorModal">
          <div className="modal-content">
            <span className="close-modal" id="closeModal" onClick={closeModal}>&times;</span>
            <div className="author-header">
              <div className="author-image">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h2 id="modalAuthorName">{currentQuote.author}</h2>
                <p id="authorBio">{currentQuote.bio}</p>
              </div>
            </div>
            <div className="author-info">
              <p><strong>Born:</strong> {currentQuote.born}</p>
              <p><strong>Profession:</strong> {currentQuote.profession}</p>
              <p><strong>Known for:</strong> {currentQuote.known}</p>
            </div>
            <div className="author-quotes">
              <h3>Other Quotes:</h3>
              {quotes.filter(q => q.author === currentQuote.author && q.text !== currentQuote.text).map((q, i) => (
                <div className="quote-item" key={i}>
                  "{q.text}"
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
