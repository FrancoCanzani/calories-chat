import { Message } from 'ai';
import { ChatScrollAnchor } from './chat-scroll-anchor';
import { cn } from '../utils/cn';
import PromptSuggestions from './prompt-suggestions';
import { Dispatch, SetStateAction } from 'react';

export default function ChatList({
  messages,
  imageUrls,
  setInput,
}: {
  messages: Message[];
  imageUrls: string[];
  setInput: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      className={cn(
        'pb-36 pt-4 px-3 sm:px-0 md:pt-10',
        imageUrls.length && 'pb-52'
      )}
    >
      {messages.length ? (
        <>
          <div className='relative mx-auto max-w-2xl space-y-3'>
            {messages.map((m) => (
              <div
                key={m.id}
                className='whitespace-pre-wrap text-xs md:text-[0.85rem]'
              >
                {m.role === 'user' ? (
                  <div className='flex justify-start relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.3em'
                      height='1.3em'
                      viewBox='0 0 24 24'
                      className='mr-1'
                    >
                      <circle cx='12' cy='6' r='4' fill='currentColor' />
                      <ellipse
                        cx='12'
                        cy='17'
                        fill='currentColor'
                        rx='7'
                        ry='4'
                      />
                    </svg>
                    <div className='rounded-md rounded-tl-none bg-gray-100 shadow px-2 py-2 w-full'>
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-start relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.3em'
                      height='1.3em'
                      viewBox='0 0 32 32'
                      className='mr-1'
                    >
                      <path
                        fill='currentColor'
                        d='m15 19l-1.414 1.414L17.172 24H4V11H2v13a2 2 0 0 0 2 2h13.172l-3.586 3.586L15 31l6-6zm9-1v-2h2V4h-2V2h6v2h-2v12h2v2z'
                      />
                      <path
                        fill='currentColor'
                        d='M21 18h2L17.5 2l-3 .009L9 18h2l1.333-4h7.334zm-8-6l3-9l3 9z'
                      />
                    </svg>
                    <div className='rounded-md rounded-tl-none bg-green-200 shadow shadow-green-300 px-2 py-2 w-full'>
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <ChatScrollAnchor messages={messages} />
        </>
      ) : (
        <div className='flex flex-col justify-evenly items-center h-[25rem]'>
          <p className='text-center capitalize text-balance font-medium text-gray-400'>
            Upload an image or ask a question
          </p>
          <PromptSuggestions setInput={setInput} />
        </div>
      )}
    </div>
  );
}
