import Image from 'next/image';
import Rating from './Rating';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

const Product = ({ title, price, description, category, image, id }) => {
  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const randomNumber = () => {
    return Math.floor(Math.random() * MAX_RATING - MIN_RATING + 1) + MIN_RATING;
  };

  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(
      addToBasket({
        id: id,
        title: title,
        price: price,
        image: image,
        description: description,
        count: 1,
      })
    );
  };

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 left-2 text-xs text-gray-400 italic'>
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <h4 className='my-3'>{title}</h4>
      <Rating count={randomNumber()} />
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <Currency quantity={price} currency='PHP' className=' mb-5' />
      <button className='button mt-auto' onClick={addItem}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
