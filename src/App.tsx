/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
function App() {
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

	return (
		<BrowserRouter>
			<Navbar totalCart={totalCart} />
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
				<Route path='/test' element={<Test />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
