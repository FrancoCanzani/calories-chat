import { Button } from './ui/button';
import { ChatRequestOptions, Message } from 'ai';

export default function ChatToolbar({
  isLoading,
  messages,
  stop,
  reload,
}: {
  isLoading: boolean;
  messages: Message[];
  stop: () => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => Promise<string | null | undefined>;
}) {
  return (
    <div className='sm:px-10 px-1 py-1 flex items-center justify-start space-x-2'>
      {isLoading && (
        <Button
          variant={'outline'}
          size={'sm'}
          className='text-xs px-2 py-1 h-8 hover:bg-gray-100'
          onClick={() => stop()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
            className='mr-1'
          >
            <path fill='currentColor' d='M6 18V6h12v12z' />
          </svg>
          Stop Response
        </Button>
      )}
      {!isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'assistant' && (
          <Button
            variant={'outline'}
            size={'sm'}
            className='text-xs px-2 py-1 h-8 hover:bg-gray-100'
            onClick={() => reload()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='mr-1'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 16H5v5m9-13h5V3M4.583 9.003a8 8 0 0 1 14.331-1.027m.504 7.021a8 8 0 0 1-14.332 1.027'
              />
            </svg>
            Regenerate Response
          </Button>
        )}
    </div>
  );
}
