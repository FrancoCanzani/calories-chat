'use client';

import { Button } from './components/ui/button';
import Image from 'next/image';
import UseTypewriteEffect from './utils/hooks/use-typewrite-effect';

export default function Page() {
  const { currentDisplay } = UseTypewriteEffect();

  return (
    <div className='bg-white m-6'>
      <div className='bg-[#F2C94C] rounded-xl'>
        <div className='px-2 md:px-10 py-16 flex justify-between items-center'>
          <div className='space-y-8 w-full md:w-1/2'>
            <h1 className='text-3xl text-center md:text-start text-balance lg:text-6xl text-green-900 font-bold mb-4'>
              Your Personal Health Assistant for a Brighter Tomorrow!
            </h1>
            <p className='text-xl text-balance md:text-nowrap text-center md:text-start text-green-950 font-medium'>
              Your Health, Elevated: AI-Powered Wellness Support at Your
              Fingertips
            </p>
            <div className='w-full md:w-3/4 h-10 md:h-12 bg-white rounded-full px-4 py-2 flex items-center justify-between'>
              <h1 className='md:text-2xl font-medium'>{currentDisplay}</h1>
              <div className='h-5 w-5 border-2 animate-pulse bg-green-900 rounded-full'></div>
            </div>
            <div className='flex items-center justify-center md:justify-start space-x-4'>
              <p className='md:text-2xl font-medium'>
                Only for <span className='line-through opacity-40'>19.99</span>{' '}
                $9.99
              </p>
              <Button className='bg-green-800 text-white text-lg px-6 py-3 rounded-full hover:bg-green-900'>
                Register
              </Button>
            </div>
          </div>
          <div className='hidden md:block w-1/2'>
            <Image
              alt='Vegan Salad'
              src='/salad.webp'
              className='mx-auto'
              style={{
                aspectRatio: '600/600',
                objectFit: 'cover',
              }}
              width='600'
              height='600'
              quality={'100'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
