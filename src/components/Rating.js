import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

const Rating = ({ count }) => {
  const starscount = new Array(count);

  return (
    <div className='flex items-center'>
      {starscount.fill().map((_, index) => (
        <StarIcon key={index} className='h-5 text-yellow-400' />
      ))}
    </div>
  );
};

export default Rating;
