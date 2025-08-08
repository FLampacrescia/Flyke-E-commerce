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
import AdminProtectedRoute from "./context/AdminProtectedRoute";
import Checkout from "./pages/Checkout/Checkout";
import OrderSidebar from "./layout/OrderSidebar/OrderSidebar";
import MyAccount from "./pages/MyAccount/MyAccount";
import UserProtectedRoute from "./context/UserProtectedRoute";
import UserAddresses from "./pages/UserAddresses/UserAddresses";
import OrderSuccess from "./pages/Checkout/OrderSuccess/OrderSuccess";
import Wishlist from "./pages/Wishlist/Wishlist";
import MyAccountProfileSection from "./components/MyAccount/MyAccountProfileSection/MyAccountProfileSection"
import MyAccountOrdersSection from "./components/MyAccount/MyAccountOrdersSection/MyAccountOrdersSection";
import NotFound from "./pages/NotFound/NotFound";

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

          <Route
            path="/my-account"
            element={
              <UserProtectedRoute>
                <MyAccount />
              </UserProtectedRoute>
            }
          >
            <Route path="profile" element={
              <UserProtectedRoute>
                <MyAccountProfileSection />
              </UserProtectedRoute>
            } />
            <Route path="wishlist" element={
              <UserProtectedRoute>
                <Wishlist />
              </UserProtectedRoute>
            } />
            <Route path="user-addresses" element={
              <UserProtectedRoute>
                <UserAddresses />
              </UserProtectedRoute>
            } />
            <Route path="orders" element={
              <UserProtectedRoute>
                <MyAccountOrdersSection />
              </UserProtectedRoute>
            } />
          </Route>
          {/* <Route path="/my-account" element={
            <UserProtectedRoute>
              <MyAccount />
            </UserProtectedRoute>
          } />
          <Route path="my-account/profile" element={
            <UserProtectedRoute>
              <MyAccountProfileSection />
            </UserProtectedRoute>
          } />
          <Route path="my-account/wishlist" element={
            <UserProtectedRoute>
              <Wishlist />
            </UserProtectedRoute>
          } />
          <Route path="my-account/user-addresses" element={
            <UserProtectedRoute>
              <UserAddresses />
            </UserProtectedRoute>
          } />
          <Route path="my-account/orders" element={
            <UserProtectedRoute>
              <MyAccountOrdersSection />
            </UserProtectedRoute>
          } /> */}
          <Route path="/checkout" element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          } />
          <Route path="/checkout/order-success" element={
            <UserProtectedRoute>
              <OrderSuccess />
            </UserProtectedRoute>
          } />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/management" element={
            <AdminProtectedRoute>
              <Management />
            </AdminProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    <Footer />
      </>
  );
}
