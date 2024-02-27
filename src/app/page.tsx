'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
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
            className='mb-4 flex items-center justify-center flex-col'
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
    <div className='mx-auto flex w-full max-w-lg flex-col space-y-4 px-4 pb-60 pt-20'>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className='whitespace-pre-wrap'>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <div className='fixed bottom-0 left-0 right-0 w-full bg-gray-50 z-20'>
        <div className='mx-auto max-w-lg px-4 py-4'>
          {input.length < 1 && imageUrls.length > 0 && messages.length < 1 && (
            <button
              className='mb-1'
              onClick={() => setInput('What are the macros on this meal?')}
            >
              What are the macros on this meal?
            </button>
          )}
          <div className='rounded border p-4'>
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
                className='mr-2 p-2 border'
              >
                +
              </button>
              <input
                className='w-full rounded border p-2'
                value={input}
                placeholder='What are the macros on this meal?'
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
