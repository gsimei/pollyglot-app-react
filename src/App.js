import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import './App.css'; 

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('French');
  const [translatedTexts, setTranslatedTexts] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [translatedTexts]);

  const handleTranslate = async () => {
    const data = { translation: { text: inputText, language: selectedLanguage } };

    try {
      const response = await fetch('/api/v1/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setTranslatedTexts([...translatedTexts, { input: inputText, translation: result.translations }]);
      setInputText('');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setTranslatedTexts([...translatedTexts, { input: inputText, translation: 'Failed to translate' }]);
      setInputText('');
    }
  };

  return (
    <div className="App">
      <div className="hero-section">
        <img src="/vector.png" alt="PollyGlot AI" className="vector-img" />
        <div className="logo">
          <img src="/parrot.png" alt="PollyGlot AI" className="parrot-img" />
        </div>
        <div className="txt-content">
          <h1>PollyGlot AI</h1>
          <p>Perfect Translation Every Time</p>
        </div>
      </div>

      <div className="container">
        <div className="chat-container">
          <div className="messages">
          <p className="translation">Select the language you want me to translate into, type your text, and hit send! </p>
            {translatedTexts.map((text, index) => (
              <div key={index} className="message">
                <p className="input">{text.input}</p>
                <p className="translation">{text.translation}</p>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
          </div>
        </div>
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={faPaperPlane} onClick={handleTranslate} className='icon' />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className='flags'>
            <img
              src="/flag-french.png"
              alt="French flag"
              className={`french-flag ${selectedLanguage === 'French' ? 'flag-selected' : ''}`}
              onClick={() => setSelectedLanguage('French')}
            />
            <img
              src="/flag-spanish.png"
              alt="Spanish flag"
              className={`spanish-flag ${selectedLanguage === 'Spanish' ? 'flag-selected' : ''}`}
              onClick={() => setSelectedLanguage('Spanish')}
            />
            <img
              src="/flag-germany.png"
              alt="Germany flag"
              className={`spanish-flag ${selectedLanguage === 'Germany' ? 'flag-selected' : ''}`}
              onClick={() => setSelectedLanguage('Germany')}
            />
            <img
              src="/flag-japan.png"
              alt="Japonese flag"
              className={`japan-flag ${selectedLanguage === 'Japonese' ? 'flag-selected' : ''}`}
              onClick={() => setSelectedLanguage('Japonese')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
