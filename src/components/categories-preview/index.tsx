import { useSelector } from 'react-redux';
import CategoryPreview from '../category-preview';
import { selectCategoryMap } from '../../store/selectors/category';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoryMap)

  return (
    <>
      {Object.keys(categoriesMap).map((category) => {
        const products = categoriesMap[category]
        return (
          <CategoryPreview key={category} category={category} products={products} />
        )
      })}
    </>
  );
};

export default CategoriesPreview;