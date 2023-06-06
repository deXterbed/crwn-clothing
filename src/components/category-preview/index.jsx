import './category-preview.scss'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/product-card';

const CategoryPreview = ({ category, products }) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={`/shop/${category}`}>{category.toUpperCase()}</Link>
      </h2>

      <div className='preview'>
        {products.slice(0, 4).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPreview