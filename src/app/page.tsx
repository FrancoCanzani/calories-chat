'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { ChatScrollAnchor } from './components/chat-scroll-anchor';

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    stop,
    reload,
    isLoading,
  } = useChat({
    api: '/api/chat',
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
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
            className='mb-2 flex items-center justify-center flex-col'
            key={index}
          >
            <Image
              src={imageUrl}
              alt='File preview'
              width={50}
              height={50}
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
    <>
      <div className='pb-[200px] pt-4 md:pt-10'>
        {messages.length ? (
          <>
            <div className='relative mx-auto max-w-2xl px-4 space-y-2'>
              {messages.map((m) => (
                <div key={m.id} className='whitespace-pre-wrap text-xs'>
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
          <p className='text-center capitalize text-balance font-medium'>
            Drop an image or ask any questions to discover cool things about
            your meals.
          </p>
        )}
      </div>

      <div className='fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]'>
        <div className='mx-auto sm:max-w-2xl sm:px-4'>
          <div className='flex items-center justify-center h-12'>
            <div className='px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4'>
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
                <div className='relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12'>
                  <input
                    className='min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
                    value={input}
                    placeholder='What are the macros on this meal?'
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
