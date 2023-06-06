import Navigation from './routes/navigation';
import Home from './routes/home';
import { Routes, Route } from 'react-router-dom';
import Shop from './routes/shop';
import Authentication from './routes/authentication';
import Checkout from './routes/checkout';

const App = () => {
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
