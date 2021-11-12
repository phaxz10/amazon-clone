import Image from 'next/image';
import Currency from 'react-currency-formatter';
import {
  removeFromBasket,
  reduceItem,
  addToBasket,
} from '../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/outline';
import Rating from './Rating';

const CartItems = ({ id, title, price, count, image, description }) => {
  const countFieldRef = useRef(null);

  useEffect(() => {
    countFieldRef.current.value = count;
  }, [count]);

  const dispatch = useDispatch();

  const removeItem = () => {
    if (window.confirm('Are you sure?')) dispatch(removeFromBasket({ id: id }));
  };

  const cutItem = () => {
    if (count > 1) dispatch(reduceItem({ id: id }));
  };

  const addItem = () => {
    dispatch(addToBasket({ id: id }));
  };

  return (
    <div className='relative grid grid-cols-5 bg-white rounded-md shadow-md p-4'>
      {image && (
        <Image src={image} width={150} height={150} objectFit='contain' />
      )}
      <div className='col-span-4 lg:col-span-3 mx-5 space-y-1'>
        <h1 className='text-normal font-medium'>{title}</h1>
        <Rating count={2} />
        <p className='text-xs text-justify'>{description}</p>
        <Currency quantity={price} currency='PHP' className='pt-2' />
      </div>
      <div className='flex col-span-full lg:col-span-1 self-center place-self-end lg:pr-5'>
        <MinusIcon
          className={`countButton ${
            count < 2 && 'bg-gray-400 hover:bg-gray-400'
          }`}
          onClick={cutItem}
        />
        <input
          className='w-7 outline-none text-center'
          ref={countFieldRef}
          value={countFieldRef.current?.value}
          type='text'
        />
        <PlusIcon className='countButton' onClick={addItem} />
      </div>
      <TrashIcon
        className='absolute h-5 text-gray-500 hover:text-red-500 top-1 right-1'
        onClick={removeItem}
      />
    </div>
  );
};

export default CartItems;
