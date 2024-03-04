'use client';

import { useChat } from 'ai/react';
import PromptForm from '../components/prompt-form';
import ChatList from '../components/chat-list';
import { useState } from 'react';

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    stop,
    reload,
    isLoading,
    append,
  } = useChat({
    api: '/api/chat',
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <>
      <ChatList messages={messages} imageUrls={imageUrls} setInput={setInput} />
      <PromptForm
        setInput={setInput}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        stop={stop}
        reload={reload}
        messages={messages}
        append={append}
      />
    </>
  );
}
