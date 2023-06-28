import { FC } from 'react';
import ProductCard from '../product-card';
import { CategoryPreviewContainer, Preview, Title } from './styles';
import { CategoryItem } from '../../store/reducers/categories/types';

type CategoryPreviewProps = {
  category: string
  products: CategoryItem[]
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ category, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={`/shop/${category}`}>{category.toUpperCase()}</Title>
      </h2>

      <Preview>
        {products.slice(0, 4).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview