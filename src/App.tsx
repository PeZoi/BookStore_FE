/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/pages/HomePage";
import About from "./layouts/about/About";
import BookDetail from "./layouts/products/BookDetail";
import FilterPage from "./layouts/pages/FilterPage";
import MyFavoriteBooksPage from "./layouts/pages/MyFavoriteBooksPage";
import CartPage from "./layouts/pages/CartPage";
import RegisterPage from "./layouts/user/RegisterPage";
import LoginPage from "./layouts/user/LoginPage";
import ProfilePage from "./layouts/user/ProfilePage";
import ActiveAccount from "./layouts/user/ActiveAccount";
import { useEffect, useState } from "react";
import CartItemModel from "./model/CartItemModel";
import Test from "./layouts/user/Test";
import { Slidebar } from "./admin/components/Slidebar";
import DashboardPage from "./admin/Dashboard";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import BookManagementPage from "./admin/BookManagement";
import UserManagementPage from "./admin/UserManagement";
import GenreManagementPage from "./admin/GenreManagement";
import OrderManagementPage from "./admin/OrderManagement";
import PolicyPage from "./layouts/pages/PolicyPage";
import FeedbackPage from "./admin/FeedbackManagement";
import { FeedbackCustomerPage } from "./layouts/pages/FeedbackCustomerPage";

const MyRoutes = () => {
	// XỬ LÝ GIỎ HÀNG //////////////////////////////
	const [cartList, setCartList] = useState<CartItemModel[]>([]);
	const [totalCart, setTotalCart] = useState(0);

	useEffect(() => {
		const cartData: string | null = localStorage.getItem("cart");
		const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
		setCartList(cart);
		setTotalCart(cart.length);
	}, []);
	////////////////////////////////////////////////

	// XỬ LÝ ẨN HIỆN NAV VÀ FOOTER /////////////////
	const location = useLocation();

	// Check if the current path starts with '/admin'
	const isAdminPath = location.pathname.startsWith("/admin");
	///////////////////////////////////////////////

	return (
		<ConfirmProvider>
			{/* Customer */}
			{!isAdminPath && <Navbar totalCart={totalCart} />}
			<Routes>
				<Route
					path='/'
					element={
						<HomePage setTotalCart={setTotalCart} totalCart={totalCart} />
					}
				/>
				<Route
					path='/book/:idBook'
					element={
						<BookDetail
							setTotalCart={setTotalCart}
							totalCart={totalCart}
						/>
					}
				/>
				<Route path='/about' element={<About />} />
				<Route
					path='/search/:idGenreParam'
					element={<FilterPage setTotalCart={setTotalCart} />}
				/>
				<Route
					path='/search'
					element={<FilterPage setTotalCart={setTotalCart} />}
				/>
				<Route
					path='/my-favorite-books'
					element={<MyFavoriteBooksPage setTotalCart={setTotalCart} />}
				/>
				<Route
					path='/cart'
					element={<CartPage setTotalCart={setTotalCart} />}
				/>
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route
					path='/active/:email/:activationCode'
					element={<ActiveAccount />}
				/>
				<Route path='/policy' element={<PolicyPage />} />
				<Route path='/feedback' element={<FeedbackCustomerPage />} />
			</Routes>
			{!isAdminPath && <Footer />}

			{/* Admin */}
			{isAdminPath && (
				<div className='row overflow-hidden w-100'>
					<div className='col-2 col-md-3 col-lg-2'>
						<Slidebar></Slidebar>
					</div>
					<div className='col-10 col-md-9 col-lg-10'>
						<Routes>
							<Route path='/admin' element={<DashboardPage />} />
							<Route
								path='/admin/dashboard'
								element={<DashboardPage />}
							/>
							<Route
								path='/admin/book'
								element={<BookManagementPage />}
							/>
							<Route
								path='/admin/user'
								element={<UserManagementPage />}
							/>
							<Route
								path='/admin/genre'
								element={<GenreManagementPage />}
							/>
							<Route
								path='/admin/order'
								element={<OrderManagementPage />}
							/>
							<Route path='/admin/feedback' element={<FeedbackPage />} />
						</Routes>
					</div>
				</div>
			)}
			<ToastContainer autoClose={4000} />
		</ConfirmProvider>
	);
};

function App() {
	return (
		<BrowserRouter>
			<MyRoutes />
		</BrowserRouter>
	);
}

export default App;
