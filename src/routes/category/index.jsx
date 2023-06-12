import { CategoryContainer, CategoryTitle } from './styles.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/product-card'
import { selectCategoryMap } from '../../selectors/category';

const Category = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const categoriesMap = useSelector(selectCategoryMap)

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </>
  )
}

export default Category