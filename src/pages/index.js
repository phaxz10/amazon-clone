import Head from 'next/head';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
// import {
//   setElectronics,
//   setJewelry,
//   setMenswear,
//   setWomenswear,
// } from '../slices/productsSlice';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';

export default function Home({ products }) {
  // console.log(products);
  // const dispatch = useDispatch();

  // const getItemByCategory = (category) => {
  //   return products.filter((items) => items.category == category);
  // };

  // useEffect(() => {
  //   dispatch(setElectronics(getItemByCategory(`electronics`)));
  //   dispatch(setJewelry(getItemByCategory('jewelery')));
  //   dispatch(setMenswear(getItemByCategory(`men's clothing`)));
  //   dispatch(setWomenswear(getItemByCategory(`women's clothing`)));
  // }, []);

  return (
    <div className='grid place-items-center bg-gray-100'>
      <Head>
        <title>Amazon clone</title>
      </Head>

      {/* header */}
      {/* <Header /> */}

      <main className='xl:max-w-screen-xl'>
        {/* main body */}
        <Banner />

        {/* product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}
