import { Categories } from '../../components/Categories';
import { catList } from '../../components/categoryList';

const Category = () => {
  return (
    <div className='cardContainer bg-gray-100'>
      {catList.map(({ image, title, link }, i) => (
        <Categories key={i} title={title} image={image} link={link} />
      ))}
    </div>
  );
};

export default Category;
