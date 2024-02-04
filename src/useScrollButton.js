import { useRef, useEffect } from 'react';

const useScrollToBottom = (dependency) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dependency]);

  return messagesEndRef;
};

export default useScrollToBottom;
