import Product from '../../components/Product';

const Details = ({ products }) => {
  console.log(products);
  return (
    <div className='cardContainer'>
      {products.map(({ id, title, price, description, category, image }) => {
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

export default Details;

export async function getServerSideProps({ query }) {
  const products = await fetch(
    `https://fakestoreapi.com/products/category/${query.tag}`
  ).then((res) => res.json());

  return {
    props: {
      products,
    },
  };
}
