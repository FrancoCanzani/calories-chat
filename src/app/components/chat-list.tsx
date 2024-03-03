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
                  <div className='flex justify-end'>
                    <div className='rounded-md rounded-br-none bg-gray-100 px-2 py-1 w-fit'>
                      {m.content}
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.3em'
                      height='1.3em'
                      viewBox='0 0 24 24'
                      className='ml-1'
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
                  </div>
                ) : (
                  <div className='flex justify-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.3em'
                      height='1.3em'
                      viewBox='0 0 24 24'
                      className='mr-1'
                    >
                      <path
                        fill='currentColor'
                        d='M12.5 1.5c-1.77 0-3.33 1.17-3.83 2.87C8.14 4.13 7.58 4 7 4a4 4 0 0 0-4 4a4.01 4.01 0 0 0 3 3.87V19h13v-7.13c1.76-.46 3-2.05 3-3.87a4 4 0 0 0-4-4c-.58 0-1.14.13-1.67.37c-.5-1.7-2.06-2.87-3.83-2.87m-.5 9h1v7h-1zm-3 2h1v5H9zm6 0h1v5h-1zM6 20v1a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-1z'
                      />
                    </svg>
                    <div className='rounded-md rounded-bl-none bg-green-200 px-2 py-1 w-fit'>
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
            Add an image or ask a question
          </p>
          <PromptSuggestions setInput={setInput} />
        </div>
      )}
    </div>
  );
}
