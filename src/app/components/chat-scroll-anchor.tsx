'use client';

import { useEffect, useRef } from 'react';
import { Message } from 'ai';

export function ChatScrollAnchor({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return <div ref={messagesEndRef} />;
}
