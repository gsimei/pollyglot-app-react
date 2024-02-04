import { useState } from 'react';
import axios from 'axios';

const useTranslation = (initialLanguage) => {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [translatedTexts, setTranslatedTexts] = useState([]);

  const handleTranslate = async () => {
    const data = { translation: { text: inputText, language: selectedLanguage } };

    try {
      const response = await axios.post('/api/v1/translate', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = response.data;
      setTranslatedTexts([...translatedTexts, { input: inputText, translation: result.translations }]);
      setInputText('');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setTranslatedTexts([...translatedTexts, { input: inputText, translation: 'Failed to translate' }]);
      setInputText('');
    }
  };

  return { inputText, setInputText, selectedLanguage, setSelectedLanguage, translatedTexts, handleTranslate };
};

export default useTranslation;
