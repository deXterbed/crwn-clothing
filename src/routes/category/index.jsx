import './category.scss'

import { useContext, useEffect, useState } from 'react'
import { CategoriesContext } from '../../contexts/categories-context'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card'

const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <>
      <h1 className='category-title'>{category.toUpperCase()}</h1>
      <div className='category-container'>
        {products && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Category