import { CheckCircleIcon } from '@heroicons/react/solid';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const success = ({ session }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/orders');
  };

  if (!session) {
    router.push('/');
    return null;
  }
  return (
    <div className='grid place-items-center pt-5'>
      <div className='max-w-screen-md bg-white p-10 shadow-lg space-y-7 flex flex-col'>
        <div className='flex space-x-2 items-center justify-center'>
          <CheckCircleIcon className='h-10 text-green-500' />
          <h4 className=' font-medium text-lg'>
            Thank You. Your order has been confirmed!
          </h4>
        </div>
        <p className='text-justify'>
          Thank you for shopping with us. We'll send a confirmation once your
          item has shipped. If you would like to check the status of your
          order(s) please press the link below.
        </p>
        <button className='button flex-grow flex-1' onClick={handleClick}>
          Go to my Orders
        </button>
      </div>
    </div>
  );
};

export default success;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
