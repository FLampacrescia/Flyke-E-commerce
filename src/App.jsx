import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import MainHeader from "./layout/MainHeader/MainHeader";
import Footer from "./layout/footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Management from "./pages/Management/Management";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import Checkout from "./pages/Checkout/Checkout";
import OrderSidebar from "./layout/OrderSidebar/OrderSidebar";

export default function App() {
  return (
    <>
    <MainHeader />
    <OrderSidebar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/management" element={
            <ProtectedRoute>
              <Management />
            </ProtectedRoute>
          } />
      </Routes>
    </main>
    <Footer />
      </>
  );
}
