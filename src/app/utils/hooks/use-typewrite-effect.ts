import { useState, useEffect } from 'react';

interface Props {
  typingSpeed?: number;
  words: string | string[];
}

export default function UseTypewriteEffect({ typingSpeed = 70, words }: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const type = () => {
      const currentWord = words[currentWordIndex];
      const displayLength = currentDisplay.length;
      const wordLength = currentWord.length;

      if (!isDeleting && displayLength === wordLength) {
        timeout = setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && displayLength === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) =>
          prevIndex === words.length - 1 ? 0 : prevIndex + 1
        );
        timeout = setTimeout(() => setCurrentDisplay(''), 200);
      }

      if (isDeleting) {
        setCurrentDisplay((prevDisplay) =>
          prevDisplay.substring(0, prevDisplay.length - 1)
        );
      } else {
        setCurrentDisplay((prevDisplay) =>
          currentWord.substring(0, prevDisplay.length + 1)
        );
      }

      timeout = setTimeout(type, typingSpeed);
    };

    timeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentWordIndex, currentDisplay, isDeleting, typingSpeed, words]);

  return { currentDisplay };
}
