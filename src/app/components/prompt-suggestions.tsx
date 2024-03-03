import { Dispatch, SetStateAction } from 'react';

export default function PromptSuggestions({
  setInput,
}: {
  setInput: Dispatch<SetStateAction<string>>;
}) {
  const promptSuggestions = [
    'Suggest healthy meal options',
    'Recommend suitable workout routines',
    'Offer advice on improving sleep quality',
    'Discuss the impact of various diets, such as vegetarian, vegan, keto...',
    'Provide guidance on managing stress and improving mental well-being',
  ];

  return (
    <div className='gap-2 p-2 sm:p-0 grid text-xs sm:text-sm'>
      {promptSuggestions.map((sug) => (
        <button
          onClick={() => setInput(sug)}
          key={sug}
          className='bg-white text-start rounded-md px-3 py-2 hover:bg-gray-50 text-gray-600 border shadow-sm'
        >
          {sug}
        </button>
      ))}
    </div>
  );
}
