import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/categories';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";
import CategoriesPreview from '../../components/categories-preview';
import Category from '../category';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    };

    getCategories();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;