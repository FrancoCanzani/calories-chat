'use client';

import { Button } from './components/ui/button';
import Image from 'next/image';
import UseTypewriteEffect from './utils/hooks/use-typewrite-effect';
import Footer from './components/footer';

export default function Page() {
  const words = [
    'Suggest healthy meal options',
    'Recommend workout routines',
    'Offer advice on improving sleep time',
  ];
  const { currentDisplay } = UseTypewriteEffect({ words });

  return (
    <div className='bg-white m-6 space-y-6'>
      <div className='bg-background rounded-xl'>
        <div className='px-2 md:px-10 py-12 flex justify-between items-center'>
          <div className='space-y-8 w-full md:w-1/2'>
            <h1 className='text-3xl text-center md:text-start text-balance lg:text-6xl text-green-900 font-bold mb-4'>
              Health.ai
            </h1>
            <h1 className='text-3xl text-center md:text-start text-balance lg:text-6xl text-green-900 font-bold mb-4'>
              Your Personal Health Assistant for a Brighter Tomorrow!
            </h1>
            <p className='text-xl text-balance text-center md:text-start text-green-950 font-medium'>
              Your Health, Elevated: AI-Powered Wellness Support at Your
              Fingertips
            </p>
            <div className='w-11/12 sm:w-5/6 md:w-3/4 mx-auto md:mx-0 h-10 md:h-12 bg-white rounded-full px-4 py-2 flex items-center justify-between'>
              <h1 className='text-sm xl:text-2xl font-medium'>
                {currentDisplay}
              </h1>
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
      <div className='bg-green-800 text-white font-medium w-full rounded-xl'>
        <div className='px-2 md:px-10 space-x-0 md:space-x-5 py-12 text-xl capitalize text-center md:text-start text-balance flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:justify-between items-center'>
          <div className='space-y-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='mx-auto md:mx-0'
            >
              <path
                fill='currentColor'
                d='M3.299 17.596c.432 1.332 1.745 2.182 3.146 2.182H6.5A2.78 2.78 0 0 0 9.223 22c.457 0 .884-.115 1.262-.313a.992.992 0 0 0 .515-.882V3.027a.997.997 0 0 0-.785-.983a2.324 2.324 0 0 0-1.479.201c-.744.356-1.18 1.151-1.18 1.978v.055a2.778 2.778 0 0 0-2.744 4.433A3.327 3.327 0 0 0 2 12c0 1.178.611 2.211 1.533 2.812c-.43.771-.571 1.746-.234 2.784m15.889-8.885a2.778 2.778 0 0 0-2.744-4.433v-.055c0-.826-.437-1.622-1.181-1.978a2.32 2.32 0 0 0-1.478-.201a.998.998 0 0 0-.785.983v17.777c0 .365.192.712.516.882c.378.199.804.314 1.261.314a2.78 2.78 0 0 0 2.723-2.223h.056c1.4 0 2.714-.85 3.146-2.182c.337-1.038.196-2.013-.234-2.784A3.35 3.35 0 0 0 22 12a3.327 3.327 0 0 0-2.812-3.289'
              />
            </svg>
            <p>Customized mental and behavioral treatment</p>
          </div>
          <div className='space-y-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 14 14'
              className='mx-auto md:mx-0'
            >
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M6.987 1.5A3.18 3.18 0 0 0 3.75 4.628V9a1 1 0 0 1-1 1H1.5A1.5 1.5 0 0 1 0 8.5v-2A1.5 1.5 0 0 1 1.5 5h.75v-.39A4.68 4.68 0 0 1 7 0a4.68 4.68 0 0 1 4.75 4.61V5h.75A1.5 1.5 0 0 1 14 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-.75v.5a2.75 2.75 0 0 1-2.44 2.733A1.5 1.5 0 0 1 8 14H6.5a1.5 1.5 0 0 1 0-3H8c.542 0 1.017.287 1.28.718a1.25 1.25 0 0 0 .97-1.218V4.627A3.18 3.18 0 0 0 6.987 1.5'
                clipRule='evenodd'
              />
            </svg>
            <p>Continuous Monitoring and Feedback</p>
          </div>
          <div className='space-y-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='mx-auto md:mx-0'
            >
              <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
              >
                <path d='M6.818 22v-2.857C6.52 16.166 3 14.572 3 10c0-4.57 2.727-8.056 8.182-8c3.927.042 7.636 2.286 7.636 6.858L21 12.286c0 2.286-2.182 2.286-2.182 2.286s.546 5.714-4.364 5.714V22' />
                <path d='M11 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4' />
                <path
                  strokeDasharray='.3 2'
                  d='M11 13a3 3 0 1 0 0-6a3 3 0 0 0 0 6'
                />
              </g>
            </svg>
            <p>Health Education and Empowerment</p>
          </div>
          <div className='space-y-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='mx-auto md:mx-0'
            >
              <path
                fill='currentColor'
                d='M5.471 3.42A5.181 5.181 0 0 0 6.89 7.301a5.12 5.12 0 0 0-3.66 4.216a10.46 10.46 0 0 0 1.37 6.797l.35.59a.757.757 0 0 0 .043.063l1.416 1.906a3.462 3.462 0 0 0 5.275.336a.437.437 0 0 1 .63 0a3.462 3.462 0 0 0 5.275-.336l1.416-1.907a.743.743 0 0 0 .042-.063l.351-.59a10.46 10.46 0 0 0 1.373-6.795a5.12 5.12 0 0 0-6.11-4.306l-1.901.394h-.003c.03-.78.152-1.62.391-2.338c.29-.868.692-1.39 1.14-1.576a.75.75 0 1 0-.578-1.385c-1.052.439-1.65 1.48-1.985 2.486l-.046.142a5.22 5.22 0 0 0-.943-1.29a5.181 5.181 0 0 0-3.98-1.51A1.367 1.367 0 0 0 5.47 3.418m2.926 7.815c-.347.069-.665.313-.864.778c-.203.474-.275 1.177-.056 2.054a.75.75 0 0 1-1.455.364c-.28-1.122-.227-2.17.132-3.009c.363-.847 1.045-1.478 1.949-1.658a.75.75 0 1 1 .294 1.47'
              />
            </svg>
            <p>Dietary Assistance</p>
          </div>
          <div className='space-y-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='mx-auto md:mx-0'
            >
              <path
                fill='currentColor'
                d='M7 22v-5H2v-4h6.45l1.7 2.575h1.8l1.35-4.325L14.45 13H22v4h-5v5zm3.7-9.25L9.525 11H2V7h5V2h10v5h5v4h-6.475l-1.7-2.55H12.05z'
              />
            </svg>
            <p>Personalized Health Recommendations</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
