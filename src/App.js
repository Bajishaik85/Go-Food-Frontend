import './App.css';
import Home from './Components/Screens/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Screens/Login';
import Signup from './Components/Screens/Signup';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './Components/ContextReducer';
import MyOrders from './Components/Screens/MyOrders';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myorders" element={<MyOrders />} />

        </Routes>

      </BrowserRouter >
      
    </CartProvider>
  );
}

export default App;
