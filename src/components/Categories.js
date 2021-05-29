import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Categories = ({ title, image, link }) => {
  const router = useRouter();

  return (
    <Link href={`/category/${link}`}>
      <div className='relative flex flex-col m-5 bg-white z-30 p-5'>
        <h4 className='font-medium pb-10'>{title}</h4>
        <Image src={image} height={300} width={300} objectFit='contain' />

        <a className='text-blue-400 text-sm pt-10 cursor-pointer'>See more</a>
      </div>
    </Link>
  );
};
