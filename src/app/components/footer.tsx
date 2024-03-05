export default function Footer() {
  return (
    <footer className='flex items-center font-medium gap-x-6 justify-center w-full'>
      © Copyright
      <a
        href='https://github.com/FrancoCanzani/calories-chat'
        target='_blank'
        className='font-medium'
      >
        {'<Source Code/>'}
      </a>
    </footer>
  );
}
