import { Link } from 'react-router-dom'
import ProductCard from '../../components/product-card';
import { CategoryPreviewContainer, Preview, Title } from './styles.jsx';

const CategoryPreview = ({ category, products }) => {
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