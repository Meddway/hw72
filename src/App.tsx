import Navigation from './components/admin/Navigation';
import {Route, Routes} from 'react-router-dom';
import DishesList from './components/admin/DishesList';
import OrdersList from './components/admin/OrdersList';

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/admin" element={<Navigation/>}/>
          <Route path= "/admin/dishes" element={<DishesList/>}/>
          <Route path= "/admin/orders" element={<OrdersList/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
