import React from 'react';

const Flag = ({ src, alt, selectedLanguage, setSelectedLanguage, language }) => (
  <img
    src={src}
    alt={alt}
    className={`${language}-flag ${selectedLanguage === language ? 'flag-selected' : ''}`}
    onClick={() => setSelectedLanguage(language)}
  />
);

export default Flag;
