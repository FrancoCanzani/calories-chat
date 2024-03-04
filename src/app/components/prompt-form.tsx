'use client';

import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
} from 'react';
import { ChatRequestOptions, CreateMessage } from 'ai';
import Image from 'next/image';
import { Button } from './ui/button';
import ChatToolbar from './chat-toolbar';
import { Message } from 'ai/react';

interface PromptProps {
  messages: Message[];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isLoading: boolean;
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
  stop: () => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => Promise<string | null | undefined>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => Promise<string | null | undefined>;
}

export default function PromptForm({
  input,
  setInput,
  isLoading,
  handleSubmit,
  handleInputChange,
  imageUrls,
  setImageUrls,
  stop,
  reload,
  messages,
  append,
}: PromptProps) {
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      const newURLs = newFiles.map((file) => URL.createObjectURL(file));

      setImageUrls((prevURLs) => [...prevURLs, ...newURLs]);

      // const newMessage: Message = {
      //   content: 'Here is the image I uploaded: ' + imageUrls[0],
      //   role: 'user',
      // };

      // append(newMessage);
      console.log(imageUrls);
      // console.log(newMessage);

      const base64Promises = newFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              resolve(e.target.result as string);
            }
          };

          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(base64Promises).then((newBase64Images) => {
        setBase64Images((prevBase64Images) => [
          ...prevBase64Images,
          ...newBase64Images,
        ]);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setImageUrls((prevFileURLs) =>
      prevFileURLs.filter((_, fileIndex) => fileIndex !== index)
    );
    setBase64Images((prevBase64Images) =>
      prevBase64Images.filter((_, fileIndex) => fileIndex !== index)
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const FilePreview = () =>
    imageUrls.length ? (
      <div className='flex space-x-2'>
        {imageUrls.map((imageUrl, index) => (
          <div
            className='mb-1 flex items-center justify-center flex-col'
            key={index}
          >
            <Image
              src={imageUrl}
              alt='File preview'
              width={65}
              height={65}
              className='rounded shadow-sm mb-1'
            />
            <button
              type='button'
              onClick={() => handleRemoveFile(index)}
              className='text-xs font-semibold'
            >
              Drop
            </button>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <div className='fixed z-50 inset-x-0 bottom-0 w-full bg-white animate-in duration-300 ease-in-out'>
      <div className='mx-auto sm:max-w-3xl sm:px-4 backdrop-blur-sm'>
        <ChatToolbar
          stop={stop}
          reload={reload}
          messages={messages}
          isLoading={isLoading}
        />
        <div className='flex items-center justify-center'>
          <div className='px-4 py-2 sm:w-[90%] w-full space-y-1 border-t shadow-lg rounded-t-md border md:py-3'>
            <FilePreview />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e, {
                  data: {
                    base64Images: JSON.stringify(base64Images),
                  },
                });
              }}
              className='flex items-center justify-center'
            >
              <div className='relative flex items-center justify-start w-full px-2 sm:px-4 overflow-hidden max-h-60 grow bg-background rounded-md sm:border'>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className='hidden'
                />
                <button
                  type='button'
                  onClick={handleFileButtonClick}
                  className='inline-flex items-center justify-center text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md bg-background p-0'
                >
                  +
                </button>
                <input
                  className='sm:min-h-[60px] w-full bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
                  value={input}
                  placeholder="What's the nutritional content of a chicken breast?"
                  autoFocus
                  onChange={handleInputChange}
                />
                <Button
                  type='submit'
                  size='icon'
                  disabled={isLoading || input === ''}
                  className='inline-flex items-center justify-center text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md bg-background p-0'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    viewBox='0 0 256 256'
                  >
                    <path
                      fill='currentColor'
                      d='M196 32v144a4 4 0 0 1-4 4H57.66l41.17 41.17a4 4 0 0 1-5.66 5.66l-48-48a4 4 0 0 1 0-5.66l48-48a4 4 0 1 1 5.66 5.66L57.66 172H188V32a4 4 0 0 1 8 0'
                    />
                  </svg>{' '}
                  <span className='sr-only'>Send message</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
