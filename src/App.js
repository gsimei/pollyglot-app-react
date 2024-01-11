import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('French');
  const [translatedTexts, setTranslatedTexts] = useState([]);

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
      <h1>Translator App</h1>

      <div>
        {translatedTexts.map((text, index) => (
          <div key={index} className="message">
            <p className="input">{text.input}</p>
            <p className="translation">{text.translation}</p>
          </div>
        ))}
      </div>
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
        alt="German flag"
        className={`germany-flag ${selectedLanguage === 'Germany' ? 'flag-selected' : ''}`}
        onClick={() => setSelectedLanguage('German')}
      />
      <img
        src="/flag-japan.png"
        alt="German flag"
        className={`japan-flag ${selectedLanguage === 'Japonese' ? 'flag-selected' : ''}`}
        onClick={() => setSelectedLanguage('Japonese')}
      />
    </div>
    </div>
  );
}

export default App;
