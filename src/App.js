import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './routes/navigation';
import Home from './routes/home';
import Shop from './routes/shop';
import Authentication from './routes/authentication';
import Checkout from './routes/checkout';
import { checkUserSession } from './store/reducers/user';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop/*' element={<Shop />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
