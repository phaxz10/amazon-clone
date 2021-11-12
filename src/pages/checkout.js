import Image from 'next/image';
import Link from 'next/link';
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux';
import CartItems from '../components/CartItems';
import { useSession, signIn } from 'next-auth/client';
import {
  selectItems,
  getItemCount,
  getTotalPrice,
} from '../slices/basketSlice';
import Header from '../components/Header';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key);

const checkout = () => {
  const [session, loading] = useSession();
  const cartItems = useSelector(selectItems);
  const itemCount = useSelector(getItemCount);
  let totalPrice = useSelector(getTotalPrice);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/stripeSession', {
      items: cartItems,
      email: session.user.email,
    });

    // redire to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert('error: ', result.error.message);
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='relative flex flex-col md:flex-row h-full'>
        {/* left */}
        <div className='flex-1 flex-grow p-4 overflow-scroll pb-[100px] no-scrollbar'>
          {/* p-5 grid-in-main md:col-span-5 */}
          <div className='flex justify-center pb-1'>
            <Image
              src='https://links.papareact.com/ikj'
              width={1020}
              height={250}
              objectFit='contain'
            />
          </div>
          <div>
            <h1 className='text-3xl pb-4 border-b'>
              {itemCount ? 'Your Shopping Basket' : 'Cart is Empty'}
            </h1>
          </div>
          {!itemCount && (
            <div className='flex justify-center p-10'>
              <img
                className='object-contain h-60 md:h-40'
                loading='lazy'
                src='https://d2t50cdkzmqfs3.cloudfront.net/version1617206862/frontend/MageBig/martfury_layout03/en_US/images/empty-cart.svg'
                alt=''
              />
            </div>
          )}
          <div className='space-y-2'>
            {cartItems.map(
              ({ id, title, price, count, image, description }) => (
                <CartItems
                  key={id}
                  id={id}
                  image={image}
                  title={title}
                  price={price}
                  description={description}
                  count={count}
                />
              )
            )}
          </div>
        </div>
        {/* right */}
        <div className='sticky bottom-0 bg-gray-200 md:min-w-[200px] lg:min-w[250px]'>
          {!itemCount ? (
            <div className='flex items-center justify-between p-2 md:justify-center'>
              <p></p>
              <Link href='/'>
                <button className='button'>Continue Shopping</button>
              </Link>
            </div>
          ) : (
            <div className='flex items-center justify-between p-2 md:justify-center md:flex-col md:space-y-2'>
              <p>
                <span className='font-medium pr-2'>Sub total:</span>
                <Currency
                  quantity={totalPrice}
                  currency='PHP'
                  className=' mb-5'
                />
              </p>
              {!session ? (
                <button
                  className='button px-10'
                  onClick={(e) => {
                    e.preventDefault();
                    signIn('google');
                  }}
                >
                  Sign In
                </button>
              ) : (
                <button
                  role='link'
                  className='button px-10'
                  onClick={createCheckoutSession}
                >
                  Check Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default checkout;
