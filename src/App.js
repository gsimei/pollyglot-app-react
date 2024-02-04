import './App.css';
import React from 'react';
import Flag from './flag';
import useTranslation from './useTranslations';
import useScrollToBottom from './useScrollButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

function App() {
  const { inputText, setInputText, selectedLanguage, setSelectedLanguage, translatedTexts, handleTranslate } = useTranslation('French');
  const messagesEndRef = useScrollToBottom(translatedTexts);


  return (
    <div className="App">
      <div className="hero-section">
        <img src="images/vector.png" alt="PollyGlot AI" className="vector-img" />
        <div className="logo">
          <img src="images/parrot.png" alt="PollyGlot AI" className="parrot-img" />
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
            <div ref={messagesEndRef} /> {}
          </div>
        </div>

        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={faPaperPlane} onClick={handleTranslate} className='icon' />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTranslate();
                }
              }}
            />
          </div>

          <div className='flags'>
            <Flag src="images/flag-french.png" alt="French flag" selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} language="French" />
            <Flag src="images/flag-spanish.png" alt="Spanish flag" selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} language="Spanish" />
            <Flag src="images/flag-united-kingdom.png" alt="United Kingdom flag" selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} language="English" />
            <Flag src="images/flag-japan.png" alt="Japonese flag" selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} language="Japonese" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
