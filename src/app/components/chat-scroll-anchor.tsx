'use client';

import { useAtBottom } from '../utils/hooks/use-at-bottom';
import { useEffect, useRef } from 'react';
import { Message } from 'ai';

export function ChatScrollAnchor({ messages }: { messages: Message[] }) {
  const isAtBottom = useAtBottom();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAtBottom, messages]);

  return <div ref={messagesEndRef} />;
}
