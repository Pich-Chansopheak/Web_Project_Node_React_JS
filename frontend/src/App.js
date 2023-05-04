import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Shop } from './pages/Shop/Shop';
import { About } from './pages/About/About';
import { Blog } from './pages/Blog/Blog';
import { Contact } from './pages/Contact/Contact';
import { ProductDetails } from './pages/Shop/ProductDetails';
import Cart from './components/Products/Cart';
import Signin from './components/Products/Signin';
import ShippingAddress from './components/Products/ShippingAddress';
import Signup from './components/Products/Signup';
import PaymentMethod from './components/Products/PaymentMethod';
import PlaceOrder from './components/Products/PlaceOrder';
import Order from './components/Products/Order';
import OrderHistory from './components/Products/OrderHistory';
import Profile from './components/Products/Profile';
import SearchScreen from './components/Search/SearchScreen';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Dashboard from './components/Admin/Dashboard';
import AdminProducts from './components/Admin/AdminProducts';
import ProductUpdate from './components/Admin/ProductUpdate';
import AdminUsers from './components/Admin/AdminUsers';
import AdminOrder from './components/Admin/AdminOrder';
import AdminSlideshow from './components/Admin/AdminSlideshow';
import AdminBlogs from './components/Admin/AdminBlogs';
import BlogUpdate from './components/Admin/blogUpdate';
import { BlogDetail } from './pages/Blog/BlogDetail';
import SlideshowUpdate from './components/Admin/SlideshowUpdate';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route
          path="/placeorder"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/orderhistory"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/updateproducts/:id"
          element={
            <ProtectedRoute>
              <ProductUpdate />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrder />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/slideshows"
          element={
            <ProtectedRoute>
              <AdminSlideshow />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/slideshowsupdate/:id"
          element={
            <ProtectedRoute>
              <SlideshowUpdate />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/updateblogs/:id"
          element={
            <ProtectedRoute>
              <BlogUpdate />
            </ProtectedRoute>
          }
        ></Route>


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
