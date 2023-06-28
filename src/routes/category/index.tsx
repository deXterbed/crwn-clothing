import { CategoryContainer, CategoryTitle } from './styles'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/product-card'
import { selectCategoryMap, selectCategoriesIsLoading } from '../../store/selectors/category';
import Spinner from '../../components/spinner'

type CategoryRouteParams = {
  category: string
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const isLoading = useSelector(selectCategoriesIsLoading)
  const categoriesMap = useSelector(selectCategoryMap)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryContainer>
      )}
    </>
  )
}

export default Category