import { Message } from 'ai';
import { ChatScrollAnchor } from './chat-scroll-anchor';
import { cn } from '../utils/cn';

export default function ChatList({
  messages,
  imageUrls,
}: {
  messages: Message[];
  imageUrls: string[];
}) {
  return (
    <div className={cn('pb-36 pt-4 md:pt-10', imageUrls.length && 'pb-52')}>
      {messages.length ? (
        <>
          <div className='relative mx-auto max-w-2xl px-4 space-y-2'>
            {messages.map((m) => (
              <div
                key={m.id}
                className='whitespace-pre-wrap text-xs md:text-[0.85rem]'
              >
                {m.role === 'user' ? (
                  <div className='flex justify-end'>
                    <div className='rounded-md rounded-br-none bg-gray-100 px-2 py-1 w-fit'>
                      {'User: '}
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-start'>
                    <div className='rounded-md rounded-bl-none bg-green-200 px-2 py-1 w-fit'>
                      {'Assistant: '}
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
        <div className='flex justify-center items-center h-[25rem]'>
          <p className='text-center capitalize text-balance font-medium text-gray-400'>
            Add an image or ask a question
          </p>
        </div>
      )}
    </div>
  );
}
