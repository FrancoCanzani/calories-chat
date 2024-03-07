'use client';

import { Message } from 'ai';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CopyToClipboard({ message }: { message: Message }) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 1000);
      toast.success('Text copied to clipboard');
    } catch (error) {
      toast.error('Error copying to clipboard');
    }
  };

  return (
    <Button
      onClick={() => handleClick(message.content)}
      className='absolute -right-3 -top-1'
      aria-label='copy to clipboard'
    >
      {hasCopied ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 16 16'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='m2.75 8.75l3.5 3.5l7-7.5'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 256 256'
        >
          <path
            fill='currentColor'
            d='M184 66H40a6 6 0 0 0-6 6v144a6 6 0 0 0 6 6h144a6 6 0 0 0 6-6V72a6 6 0 0 0-6-6m-6 144H46V78h132Zm44-170v144a6 6 0 0 1-12 0V46H72a6 6 0 0 1 0-12h144a6 6 0 0 1 6 6'
          />
        </svg>
      )}
    </Button>
  );
}
