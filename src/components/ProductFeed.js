import React from 'react';
import { Categories } from './Categories';
import Product from './Product';
import { catList } from './categoryList';

const ProductFeed = ({ products }) => {
  return (
    <div className='cardContainer -mt-28 md:-mt-32 lg:-mt-52'>
      {catList.map(({ image, title, link }, i) => (
        <Categories key={i} title={title} image={image} link={link} />
      ))}

      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}

      <img
        src='https://links.papareact.com/dyz'
        alt=''
        className='md:col-span-full'
      />

      {products
        .slice(4, products.length)
        .map(({ id, title, price, description, category, image }) => {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}
    </div>
  );
};

export default ProductFeed;
