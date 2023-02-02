import './App.css';
import Signup from './components/SignUp'
import Login from './components/Login'
import GetCakes from './components/GetCakes'
import Navbar from './components/Navbar'
import CakeDetails from './components/CakeDetails'
import PageNotFound from './components/PageNotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SearchCakesResult from './components/SearchCakesResult'
import UserDetails from './components/UserDetails'
import AddCake from './components/AddCake'
import MyCart from './components/MyCart'
import CheckOut from './components/CheckOut'
import Summary from './components/Summary'
import Address from './components/Address'
import Payment from './components/Payment'
import MyOrders from './components/MyOrders'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<><h1>SIGNUP</h1><Signup /></>} />
          <Route path="/login" element={<><h1>LOGIN</h1><Login /></>} />
          <Route path="/cakes" element={<GetCakes />} />
          <Route path="/add-cake" element={<AddCake />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/checkout" element={<CheckOut />}>
            <Route path="" element={<Summary />} />
            <Route path="summary" element={<Summary />} />
            <Route path="address" element={<Address />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="/user/:token" element={<UserDetails />} />
          <Route path="/search" element={<SearchCakesResult />} />
          <Route path="/cakes/:cakeid" element={<CakeDetails />} />
          <Route path="/my-orders" element ={<MyOrders />} /> 
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
