import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import { AuthProvider } from "./components/context/UserAuthContext";
import Home from "./components/Home/Home";
import Landingpage from "./components/Landingpage/Landingpage";
import Navbar from "./components/Navbar/Navbar";
import Productlist from "./components/ProductList/Productlist";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
// import Signup from "./components/Signup/Signup";
import SignUp from "./components/Signup/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Myprofile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminSignin from "./components/SignIn/AdminSignin";
import AdminSignup from "./components/Signup/AdminSignup";
import ViewAllcategory from "./components/Category/ViewAllcategory";
import Wishlist from "./components/Wishlist/Wishlist";
import { WishlistProvider } from "./components/context/WishlistContext";
import Recommendations from "./components/Youmaylike/Recommendations";
import Footer from "./components/Footer/Footer";
import CheckoutPage from "./components/Cart/Checkout";
import SuccessPage from "./components/success";

function App() {
  return (
    <>
      <AuthProvider>
        <WishlistProvider>
          <BrowserRouter>
            <CartProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route path="/allcategory" element={<ViewAllcategory />} />
                <Route path="/adminsignin" element={<AdminSignin />} />
                <Route path="/adminsignup" element={<AdminSignup />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product/productid/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="/product/category/:categoryName?"
                  element={<Productlist />}
                />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
              <Footer />
            </CartProvider>
          </BrowserRouter>
        </WishlistProvider>
      </AuthProvider>
    </>
  );
}

export default App;
