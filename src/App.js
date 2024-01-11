import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('French');
  const [translatedText, setTranslatedText] = useState('');

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
      setTranslatedText(result);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setTranslatedText('Failed to translate');
    }
  };

  return (
    <div className="App">
      <h1>Translator App</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="French">French</option>
        <option value="Spanish">Spanish</option>
        <option value="German">German</option>
        {/* Add more languages as needed */}
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <div>
        {translatedText.translations}
      </div>
    </div>
  );
}

export default App;
